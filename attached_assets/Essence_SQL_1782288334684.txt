--- Main Query
----- Only run the report for Prof and only for SGF and EAST.  






---Main Query only amb is sent 




--drop table Essence_main_query;

create table Essence_main_query as
select distinct
txi.tx_id ,
ibi.inv_num,
refser.prov_npi_ID as provider_NPI,
refser.prov_npi_ID as Essence_provider_number,
refser.prov_last_name as provider_last_name,
refser.prov_first_name as provider_Name_First,
to_char(arpb.service_date,'MM/DD/YYYY')   AS fROM_date,
to_char(arpb.service_date,'MM/DD/YYYY')  AS thru_date,
CVG.SUBSCR_NUM as member_nbr,
'00' as member_nbr_sfx,
pat.pat_last_name member_last_name,
pat.pat_first_name  member_first_name  ,
to_char(pat.birth_date,'MM/DD/YYYY') as member_dob,
'1' as status_code
from invoice inv
join inv_basic_info ibi on inv.invoice_id = ibi.inv_id
join clarity.svc_ln_info sli on ibi.clm_ext_val_id = SLI.RECORD_ID
JOIN HSP_ACCOUNT HA ON inv.visit_number = HA.HSP_ACCOUNT_ID
join clarity.clarity_loc loc on HA.loc_id = loc.loc_id 
join clarity.clm_values cv on cv.record_id = sli.record_id 
join bi_clarity.mv_ref_ser refser on ha.attending_prov_id = refser.prov_id
join coverage cvg on ibi.cvg_id = cvg.coverage_id
join tx_invoices txi on inv.invoice_id = txi.invoice_id
and txi.line = 1
join arpb_transactions arpb on txi.tx_id = arpb.tx_id
left join patient pat on pat.pat_id = arpb.patient_id
where 1=1
AND SLI.LINE = 1 
and ibi.inv_status_c not in (4,5,7,8)    ------- ------- Errors, rejected, removes voids and removed claims
and ( cv.bill_typ_fac_cd in (11, 12, 18)
or  ( cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85
        , 02, 22 --- added 02,22 on 7/15 due to it eliminating a confidential OV and ECHO identified as needing to be on
        , 19, 21, 23, 31, 33) ------- based off of previously submitted files
)
)
and arpb.cpt_code in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2025)
and loc.loc_id in( 20001,  --  PARENT MERCY HOSPITAL ST LOUIS  --------east
20002, --    PARENT MERCY HOSPITAL WASHINGTON   
20004, --    PARENT MERCY HOSPITAL JEFFERSON   
20006, --    PARENT MERCY HOSPITAL LINCOLN   
20007,   --PARENT MERCY HOSPITAL SOUTH
20010,  --PARENT MERCY HOSPITAL PERRY
20012, --PARENT MERCY HOSPITAL SOUTHEAST
40006,    --    PARENT MERCY ST FRANCIS HOSPITAL  ------------------sgf
40001,--    PARENT MERCY HOSPITAL SPRINGFIELD   
40002,--    PARENT MERCY HOSPITAL LEBANON   
40003,--    PARENT MERCY HOSPITAL AURORA   
40004,--    PARENT MERCY HOSPITAL BERRYVILLE   
40005, --    PARENT MERCY HOSPITAL CASSVILLE   
90003,  --PARENT MERCY HOSPITAL CARTHAGE
90001,   -- PARENT MERCY HOSPITAL JOPLIN
90002, --PARENT MERCY HOSPITAL PITTSBURG
90005,---- PARENT MERCY SPECIALTY HOSPITAL SOUTHEAST KANSAS
90004)  --PARENT MERCY MAUDE NORTON HOSPITAL COLUMBUS
and ibi.to_svc_date  >= '01-JAN-25'
and ibi.to_svc_date  < '01-JAN-26'
and ibi.EPP_ID in (2012201, --  Essence MCR
32012201,  -- Essence MCR CONTRACTED 
42012201) --	Essence MCR NON-CONTRACTED 





_____________________________________________________________________________________________________________________________________________________________________________________________________________________________




--OP Dx Query


--drop table Essence_OP_DX_query;

create table Essence_OP_DX_query as
select distinct 
main.inv_num,
main.fROM_date,
main.thru_date,
vdx.dx_code as dx,
--replace(vdx.dx_code,'.','') as dx,
DENSE_RANK() OVER (PARTITION BY main.inv_num,main.fROM_date,main.thru_date ORDER BY main.inv_num,main.fROM_date,main.thru_date,vdx.line ASC) line
--main."CPT CODE"
from Essence_main_query main 
join v_arpb_coding_dx vdx on main.tx_id = vdx.tx_id
                                  and vdx.source_key = 3
 where 1=1
 and vdx.dx_code is not null
 



____________________________________________________________________________________________________________________________________________________________________________________________________________________________________
-- output dx lines 1-52 
--- only one dx code per row


with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx1.dx as diagnosis_code,
c.status_code
      from cohert c
  left join Essence_op_dx_query opdx1 on opdx1.inv_num = c.inv_num      
                       and opdx1.fROM_date = c.fROM_date
                       and  opdx1.thru_date = c.thru_date  
                       and  opdx1.line = 1  ;                                    
            
    
      
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 1
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx2.dx as diagnosis_code,
c.status_code
      from cohert c      
   left join Essence_op_dx_query opdx2 on opdx2.inv_num = c.inv_num      
                       and opdx2.fROM_date = c.fROM_date
                       and  opdx2.thru_date = c.thru_date  
                       and  opdx2.line = 2;
                                                      

   with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 2
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx3.dx as diagnosis_code,
c.status_code
      from cohert c      
   left join Essence_op_dx_query opdx3 on opdx3.inv_num = c.inv_num      
                       and opdx3.fROM_date = c.fROM_date
                       and  opdx3.thru_date = c.thru_date  
                       and  opdx3.line = 3;



with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 3
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx4.dx as diagnosis_code,
c.status_code
      from cohert c
    left join Essence_op_dx_query opdx4 on opdx4.inv_num = c.inv_num      
                       and opdx4.fROM_date = c.fROM_date
                       and  opdx4.thru_date = c.thru_date  
                       and  opdx4.line = 4   ;

with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 4
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx5.dx as diagnosis_code,
c.status_code
      from cohert c
   left join Essence_op_dx_query opdx5 on opdx5.inv_num = c.inv_num      
                       and opdx5.fROM_date = c.fROM_date
                       and  opdx5.thru_date = c.thru_date  
                       and  opdx5.line = 5 ;  

with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 5
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx6.dx as diagnosis_code,
c.status_code
      from cohert c
   left join Essence_op_dx_query opdx6 on opdx6.inv_num = c.inv_num      
                       and opdx6.fROM_date = c.fROM_date
                       and  opdx6.thru_date = c.thru_date  
                       and  opdx6.line = 6 ; 



with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 6
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx7.dx as diagnosis_code,
c.status_code
      from cohert c
   left join Essence_op_dx_query opdx7 on opdx7.inv_num = c.inv_num      
                       and opdx7.fROM_date = c.fROM_date
                       and  opdx7.thru_date = c.thru_date  
                       and  opdx7.line = 7   ;

with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 7
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx8.dx as diagnosis_code,
c.status_code
      from cohert c
   left join Essence_op_dx_query opdx8 on opdx8.inv_num = c.inv_num      
                       and opdx8.fROM_date = c.fROM_date
                       and  opdx8.thru_date = c.thru_date  
                       and  opdx8.line = 8;


with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 8
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx9.dx as diagnosis_code,
c.status_code
      from cohert c
   left join Essence_op_dx_query opdx9 on opdx9.inv_num = c.inv_num      
                       and opdx9.fROM_date = c.fROM_date
                       and  opdx9.thru_date = c.thru_date  
                       and  opdx9.line = 9 ;  


with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 9
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx10.dx as diagnosis_code,
c.status_code
      from cohert c
   left join Essence_op_dx_query opdx10 on opdx10.inv_num = c.inv_num      
                       and opdx10.fROM_date = c.fROM_date
                       and  opdx10.thru_date = c.thru_date  
                       and  opdx10.line = 10  ; 



with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 10
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx11.dx as diagnosis_code,
c.status_code
      from cohert c
   left join Essence_op_dx_query opdx11 on opdx11.inv_num = c.inv_num      
                       and opdx11.fROM_date = c.fROM_date
                       and  opdx11.thru_date = c.thru_date  
                        and  opdx11.line = 11 ;  



with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 11
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx12.dx as diagnosis_code,
c.status_code
      from cohert c
   left join Essence_op_dx_query opdx12 on opdx12.inv_num = c.inv_num      
                       and opdx12.fROM_date = c.fROM_date
                       and  opdx12.thru_date = c.thru_date  
                       and  opdx12.line = 12 ;
                        
                        
                        
with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 12
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx13.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx13 on opdx13.inv_num = c.inv_num      
  and opdx13.fROM_date = c.fROM_date
  and  opdx13.thru_date = c.thru_date  
 and  opdx13.line = 13 ;
                        


with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 13
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx14.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx14 on opdx14.inv_num = c.inv_num      
  and opdx14.fROM_date = c.fROM_date
  and  opdx14.thru_date = c.thru_date  
 and  opdx14.line = 14 ;
                        
with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 14
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx15.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx15 on opdx15.inv_num = c.inv_num      
  and opdx15.fROM_date = c.fROM_date
  and  opdx15.thru_date = c.thru_date  
 and  opdx15.line = 15 ;
                        
                        
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 15
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx16.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx16 on opdx16.inv_num = c.inv_num      
  and opdx16.fROM_date = c.fROM_date
  and  opdx16.thru_date = c.thru_date  
 and  opdx16.line = 16 ;       
                        
                        
                        
with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 16
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx17.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx17 on opdx17.inv_num = c.inv_num      
  and opdx17.fROM_date = c.fROM_date
  and  opdx17.thru_date = c.thru_date  
 and  opdx17.line = 17 ;                        
                        
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 17
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx18.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx18 on opdx18.inv_num = c.inv_num      
  and opdx18.fROM_date = c.fROM_date
  and  opdx18.thru_date = c.thru_date  
 and  opdx18.line = 18 ;    
 
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 18
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx19.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx19 on opdx19.inv_num = c.inv_num      
  and opdx19.fROM_date = c.fROM_date
  and  opdx19.thru_date = c.thru_date  
 and  opdx19.line = 19 ;                        
                                               
                                  
                                  
   with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 19
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx20.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx20 on opdx20.inv_num = c.inv_num      
  and opdx20.fROM_date = c.fROM_date
  and  opdx20.thru_date = c.thru_date  
 and  opdx20.line = 20 ;   
 
 
 
    with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 20
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx21.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx21 on opdx21.inv_num = c.inv_num      
  and opdx21.fROM_date = c.fROM_date
  and  opdx21.thru_date = c.thru_date  
 and  opdx21.line = 21 ;       
 
 
    with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 21
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx22.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx22 on opdx22.inv_num = c.inv_num      
  and opdx22.fROM_date = c.fROM_date
  and  opdx22.thru_date = c.thru_date  
 and  opdx22.line = 22 ;  
 
 
 
with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 22
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx23.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx23 on opdx23.inv_num = c.inv_num      
  and opdx23.fROM_date = c.fROM_date
  and  opdx23.thru_date = c.thru_date  
 and  opdx23.line = 23 ;     
 
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 23
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx24.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx24 on opdx24.inv_num = c.inv_num      
  and opdx24.fROM_date = c.fROM_date
  and  opdx24.thru_date = c.thru_date  
 and  opdx24.line = 24 ;       
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 24
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx25.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx25 on opdx25.inv_num = c.inv_num      
  and opdx25.fROM_date = c.fROM_date
  and  opdx25.thru_date = c.thru_date  
 and  opdx25.line = 25 ;  
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 25
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx26.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx26 on opdx26.inv_num = c.inv_num      
  and opdx26.fROM_date = c.fROM_date
  and  opdx26.thru_date = c.thru_date  
 and  opdx26.line = 26 ; 
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 26
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx27.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx27 on opdx27.inv_num = c.inv_num      
  and opdx27.fROM_date = c.fROM_date
  and  opdx27.thru_date = c.thru_date  
 and  opdx27.line = 27 ;
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 27
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx28.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx28 on opdx28.inv_num = c.inv_num      
  and opdx28.fROM_date = c.fROM_date
  and  opdx28.thru_date = c.thru_date  
 and  opdx28.line = 28 ;
 
 
 
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 28
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx29.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx29 on opdx29.inv_num = c.inv_num      
  and opdx29.fROM_date = c.fROM_date
  and  opdx29.thru_date = c.thru_date  
 and  opdx29.line = 29 ;  
 
 
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 29
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx30.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx30 on opdx30.inv_num = c.inv_num      
  and opdx30.fROM_date = c.fROM_date
  and  opdx30.thru_date = c.thru_date  
 and  opdx30.line = 30 ;   
 
 
   with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 30
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx31.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx31 on opdx31.inv_num = c.inv_num      
  and opdx31.fROM_date = c.fROM_date
  and  opdx31.thru_date = c.thru_date  
 and  opdx31.line = 31 ;  
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 31
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx32.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx32 on opdx32.inv_num = c.inv_num      
  and opdx32.fROM_date = c.fROM_date
  and  opdx32.thru_date = c.thru_date  
 and  opdx32.line = 32 ; 
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 32
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx33.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx33 on opdx33.inv_num = c.inv_num      
  and opdx33.fROM_date = c.fROM_date
  and  opdx33.thru_date = c.thru_date  
 and  opdx33.line = 33 ;
 
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 33
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx34.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx34 on opdx34.inv_num = c.inv_num      
  and opdx34.fROM_date = c.fROM_date
  and  opdx34.thru_date = c.thru_date  
 and  opdx34.line = 34 ;   
 
 
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 34
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx35.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx35 on opdx35.inv_num = c.inv_num      
  and opdx35.fROM_date = c.fROM_date
  and  opdx35.thru_date = c.thru_date  
 and  opdx35.line = 35 ;   
 
 
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 35
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx36.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx36 on opdx36.inv_num = c.inv_num      
  and opdx36.fROM_date = c.fROM_date
  and  opdx36.thru_date = c.thru_date  
 and  opdx36.line = 36 ;   




 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 36
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx37.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx37 on opdx37.inv_num = c.inv_num      
  and opdx37.fROM_date = c.fROM_date
  and  opdx37.thru_date = c.thru_date  
 and  opdx37.line = 37 ;  
 
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 37
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx38.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx38 on opdx38.inv_num = c.inv_num      
  and opdx38.fROM_date = c.fROM_date
  and  opdx38.thru_date = c.thru_date  
 and  opdx38.line = 38 ;  
 
 
 
 with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 38
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx39.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx39 on opdx39.inv_num = c.inv_num      
  and opdx39.fROM_date = c.fROM_date
  and  opdx39.thru_date = c.thru_date  
 and  opdx39.line = 39 ;  
 
 
 
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 39
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx40.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx40 on opdx40.inv_num = c.inv_num      
  and opdx40.fROM_date = c.fROM_date
  and  opdx40.thru_date = c.thru_date  
 and  opdx40.line = 40 ;  
 
 
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 40
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx41.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx41 on opdx41.inv_num = c.inv_num      
  and opdx41.fROM_date = c.fROM_date
  and  opdx41.thru_date = c.thru_date  
 and  opdx41.line = 41 ;  
 
 
 
   with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 41
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx42.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx42 on opdx42.inv_num = c.inv_num      
  and opdx42.fROM_date = c.fROM_date
  and  opdx42.thru_date = c.thru_date  
 and  opdx42.line = 42 ; 
 
 
 
  with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 42
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx43.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx43 on opdx43.inv_num = c.inv_num      
  and opdx43.fROM_date = c.fROM_date
  and  opdx43.thru_date = c.thru_date  
 and  opdx43.line = 43 ;  
 
 
 
   with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 43
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx44.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx44 on opdx44.inv_num = c.inv_num      
  and opdx44.fROM_date = c.fROM_date
  and  opdx44.thru_date = c.thru_date  
 and  opdx44.line = 44 ;  
 
 
    with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 44
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx45.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx45 on opdx45.inv_num = c.inv_num      
  and opdx45.fROM_date = c.fROM_date
  and  opdx45.thru_date = c.thru_date  
 and  opdx45.line = 45 ; 
 
 
 
  
    with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 45
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx46.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx46 on opdx46.inv_num = c.inv_num      
  and opdx46.fROM_date = c.fROM_date
  and  opdx46.thru_date = c.thru_date  
 and  opdx46.line = 46 ;  
 
 
 
     with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 46
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx47.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx47 on opdx47.inv_num = c.inv_num      
  and opdx47.fROM_date = c.fROM_date
  and  opdx47.thru_date = c.thru_date  
 and  opdx47.line = 47 ; 
 
 
 
 
  
     with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 47
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx48.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx48 on opdx48.inv_num = c.inv_num      
  and opdx48.fROM_date = c.fROM_date
  and  opdx48.thru_date = c.thru_date  
 and  opdx48.line = 48 ; 
 
 
 
      with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 48
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx49.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx49 on opdx49.inv_num = c.inv_num      
  and opdx49.fROM_date = c.fROM_date
  and  opdx49.thru_date = c.thru_date  
 and  opdx49.line = 49 ;
 
 
 
  
      with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 49
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx50.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx50 on opdx50.inv_num = c.inv_num      
  and opdx50.fROM_date = c.fROM_date
  and  opdx50.thru_date = c.thru_date  
 and  opdx50.line = 50 ; 
 
 
 
   
      with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 50
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx51.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx51 on opdx51.inv_num = c.inv_num      
  and opdx51.fROM_date = c.fROM_date
  and  opdx51.thru_date = c.thru_date  
 and  opdx51.line = 51 ; 
 
 
 
       with cohert as(

select distinct 
opdx.inv_num,
main.provider_NPI,
main.Essence_provider_number,
main.provider_last_name,
main.provider_Name_First,
opdx.fROM_date,
opdx.thru_date,
main.member_nbr,
'00' as member_nbr_sfx,
main.member_last_name ,
main.member_first_name ,
main.member_dob ,
'1' as status_code
 from
 Essence_op_dx_query opdx
 join Essence_main_query main on main.inv_num = opdx.inv_num
 where 1=1
 and opdx.line > 51
 ) 
select distinct 
c.inv_num,
c.provider_NPI,
c.Essence_provider_number,
c.provider_last_name,
c.provider_Name_First,
c.fROM_date ,
c.thru_date,
c.member_nbr,
c.member_nbr_sfx,
c.member_last_name ,
c.member_first_name ,
c.member_dob ,
opdx52.dx as diagnosis_code,
c.status_code
      from cohert c
     
 left join Essence_op_dx_query opdx52 on opdx52.inv_num = c.inv_num      
  and opdx52.fROM_date = c.fROM_date
  and  opdx52.thru_date = c.thru_date  
 and  opdx52.line = 52 ; 