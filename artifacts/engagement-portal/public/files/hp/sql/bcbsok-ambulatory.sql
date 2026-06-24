


--drop table bcbsok_main_query;

create table bcbsok_main_query as
select
txi.tx_id tx_id,
ibi.inv_num,
'CR' as recordid,
case
when substr( cvg.SUBSCR_NUM, 1,3) = 'YUB' then 'H3979'
when substr( cvg.SUBSCR_NUM, 1,3) = 'YUX'  then 'H4801'
when substr( cvg.SUBSCR_NUM, 1,3) = 'YUA'  then 'H4801'
when substr( cvg.SUBSCR_NUM, 1,3) = 'YUW' then 'H3979'
when substr( cvg.SUBSCR_NUM, 1,3) = 'ZGJ' then 'H9706'
--when substr( cvg.SUBSCR_NUM, 1,3) = 'ZZT' then 'H1666'
when substr( cvg.SUBSCR_NUM, 1,3) = 'XOD' then 'H8634'
when substr( cvg.SUBSCR_NUM, 1,3) = 'ZZT' then 'H0107'
when substr( cvg.SUBSCR_NUM, 1,3) = 'JLX' then 'H8634'
when substr( cvg.SUBSCR_NUM, 1,3) = 'ZGD' then 'H4801'
when substr( cvg.SUBSCR_NUM, 1,3) = 'YIJ' then 'H3251'
when substr( cvg.SUBSCR_NUM, 1,3) = 'YID' then 'H8634'
when substr( cvg.SUBSCR_NUM, 1,3) = 'JYN' then 'H0107'
else substr( cvg.SUBSCR_NUM, 1,3)
end plan_id,
--'MER'||txi.tx_id||to_char(sysdate,'MMDDYYYY') claim_id_a,
'MER'||txi.tx_id claim_id_a,
cast(null as number) CMS_ICN,
cast(null as number) ChartReviewReferenceId,
 cv.BILL_TYP_FREQ_CD FrequencyCode, 
cv2.rend_prov_taxonomy ProviderTaxonomyCode,
upper(regexp_replace(regexp_replace(cvg.medicare_subscr_id,'[- ]',''), '^(([0-9]{9}[a-z][0-9a-z]?)$|([a-z]{1,3}[0-9]{6})$|([a-z]{1,3}
 [0-9]{9})$|([0-9][a-z][0-9a-z][0-9][a-z][0-9a-z][0-9][a-z]{2}[0-9]{2}$)|.*)','\2\3\4\5',1,0,'i')) HICN,
to_char(pat.birth_date,'YYYYMMDD') as DOB,
to_char(arpb.service_date,'YYYYMMDD')  AS DOS_FROM,
to_char(arpb.service_date,'YYYYMMDD')  AS DOS_Through,
substr(pos.pos_code,1,20) POS,
ser2.npi as BillingProviderNPI,
inv.tax_id BillingProviderTaxId,
--refser.prov_last_name,
initcap(SUBSTR(TRIM(SUBSTR(ser.PROV_NAME,1,DECODE(INSTR(ser.PROV_NAME,','),0,30,INSTR(ser.PROV_NAME,',')-1))),1,30)) as last_name,
--refser.prov_first_name,
pos.address_line_1 ,
pos.city,
zs.abbr,
pos.zip,
CVG.SUBSCR_NUM as Member_ID,
pat.pat_last_name,
pat.pat_first_name,
pat.add_line_1 as Member_Street_Address_1,
pat.city as Member_City,
st.abbr as Member_State_Code,
pat.zip Member_Zip_Code,
case 
when pat.sex_c = 1 then 'F'
when pat.sex_c = 2 then 'M'
else pat.sex_c
end as GENDER,
cast(null as number) ProductOrServiceQualifier,
arpb.cpt_code ProcedureCode,
'DGS' DGS,
'10' diag_type01,
cast(null as number)diag_type02,
cast(null as number)diag_type03,
cast(null as number)diag_type04,
cast(null as number)diag_type05,
cast(null as number)diag_type06,
cast(null as number)diag_type07,
cast(null as number)diag_type08,
cast(null as number)diag_type09,
cast(null as number)diag_type10,
cast(null as number)diag_type11,
cast(null as number)diag_type12
from invoice inv
join inv_basic_info ibi on inv.invoice_id = ibi.inv_id
join clarity.svc_ln_info sli on ibi.clm_ext_val_id = SLI.RECORD_ID
JOIN HSP_ACCOUNT HA ON inv.visit_number = HA.HSP_ACCOUNT_ID
join clarity.clarity_loc loc on HA.loc_id = loc.loc_id 
join clarity.clm_values cv on cv.record_id = sli.record_id 
join clarity.clm_values_2 cv2 on sli.record_id = cv2.record_id
join bi_clarity.mv_ref_ser refser on ha.attending_prov_id = refser.prov_id
join coverage cvg on ibi.cvg_id = cvg.coverage_id
join tx_invoices txi on inv.invoice_id = txi.invoice_id
and txi.line = 1
join arpb_transactions arpb on txi.tx_id = arpb.tx_id 
left join patient pat on pat.pat_id = arpb.patient_id
left join zc_state st on st.state_c = pat.state_c
join clarity_ser ser on arpb.serv_provider_id = ser.prov_id 
join clarity_ser_2 ser2 on ser2.prov_id = ser.prov_id 
join clarity_pos pos on pos.pos_id = arpb.pos_id
join zc_state zs on pos.state_c = zs.state_c

where 1=1
AND SLI.LINE = 1 
and BILL_TYP_FREQ_CD in (1,7,8)
--and ibi.inv_num = 'POK1355757840'
and ibi.inv_status_c not in (4,5,7,8)    ------- Errors, rejected, removes voids and removed claims
and substr( cvg.SUBSCR_NUM, 1,3) not in ('MMT','JKW','PBH','MBL','PMV','XPS','VOH','XRT','XYY','XYL','RKN',
           'UZS','XLU','YGZ','ZVR','YUA','ZXD','XJF','XYK','XZL','WZD','VOJ','L5I','VGD','Y3L','VOE','XXU',
           'YUP','YVK','HRF','5MK','MMA','JWO','JKW','MBG','MCM','HRT','XEE','VOK','X3L','L5B','VNC','VOK','VYM',
           'WZV','XCX','XJP','XJI','Y2M','YJX','ZMX','YWW')
and loc.loc_id in (50001, -- PARENT MERCY HOSPITAL HEALDTON
50003, -- PARENT MERCY HOSPITAL OKLAHOMA CITY
50004, -- PARENT MERCY HOSPITAL ARDMORE
50005, -- PARENT MERCY HOSPITAL TISHOMINGO
50006, -- PARENT MERCY HOSPITAL WATONGA
50007, -- PARENT MERCY HOSPITAL ADA
50009, -- PARENT MERCY HOSPITAL LOGAN COUNTY
50011) -- PARENT MERCY HOSPITAL KINGFISHER
and ibi.EPP_ID in (2004702, ---- BCBS MEDICARE HMO 
2004703, ---- BCBS MEDICARE PFFS 
2004704, ---- BCBS HEALTH ADV MEDIPAK ADV HMO H9699 MCR 
32004701, --
32004702, ---- BCBS MEDICARE HMO CONTRACTED 
32004703, ---- BCBS MEDICARE PFFS CONTRACTED 
32004704 ---- BCBS HEALTH ADV MEDIPAK ADV HMO H9699 MCR CONTRACTED 
)
and  ibi.to_svc_date  >= '01-JAN-25'
and ibi.to_svc_date < '01-JAN-26'
and
   ( cv.bill_typ_fac_cd in (11, 12, 18) or
        ( cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85
        , 02, 22 --- added 02,22 on 7/15 due to it eliminating a confidential OV and ECHO identified as needing to be on
        , 19, 21, 23, 31, 33) ------- based off of previously submitted files for Humana
        )
        )
and arpb.cpt_code in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2025) 

______________________________________________________________________________________________________________________________________________________________________________________________________________________________

--DX Code query grabs all the DX codes from the bcbsok_main_query

--drop table bcbsok_OP_DX_query;

create table bcbsok_OP_DX_query as
select distinct
main.inv_num,
main.DOS_FROM,
main.DOS_Through,
replace(vdx.dx_code,'.','') as dx,
DENSE_RANK() OVER (PARTITION BY inv_num,ProcedureCode,DOS_FROM,DOS_Through ORDER BY inv_num,DOS_FROM,DOS_Through,line ASC) line,
main.ProcedureCode,
main.tx_id
from  bcbsok_main_query main 
 join v_arpb_coding_dx vdx on main.tx_id = vdx.tx_id
                                  and vdx.source_key = 3
 where 1=1
 --and vdx.dx_code not in (select dx_dec from alpeter2.alp_cancer_dx)--lareed4.cancer_dx_2022) remove per JS 12/13/2024
 and vdx.dx_code is not null


_____________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 1-12 dx codes.


with cohert as(

select distinct 
opdx.inv_num,
'CR' as recordid,
plan_id,
claim_id_a,
CMS_ICN,
ChartReviewReferenceId,
FrequencyCode, 
ProviderTaxonomyCode,
HICN,
DOB,
opdx.DOS_FROM,
opdx.DOS_Through,
POS,
BillingProviderNPI,
BillingProviderTaxId,
last_name,
address_line_1 ,
city,
abbr,
zip,
Member_ID,
pat_last_name,
pat_first_name,
Member_Street_Address_1,
Member_City,
Member_State_Code,
Member_Zip_Code,
GENDER,
ProductOrServiceQualifier,
opdx.ProcedureCode,
'DGS' DGS,
'10' diag_type01,
diag_type02,
diag_type03,
diag_type04,
diag_type05,
diag_type06,
diag_type07,
diag_type08,
diag_type09,
diag_type10,
diag_type11,
diag_type12
 from
 bcbsok_OP_DX_query opdx
 join bcbsok_main_query main on main.inv_num = opdx.inv_num
   and opdx.tx_id = main.tx_id
 where 1=1

) 
select distinct 
c.inv_num,
c.recordid,
c.plan_id,
c.claim_id_a,
c.CMS_ICN,
c.ChartReviewReferenceId,
c.FrequencyCode, 
c.ProviderTaxonomyCode,
c.HICN,
c.DOB,
c.DOS_FROM,
c.DOS_Through,
c.POS,
c.BillingProviderNPI,
c.BillingProviderTaxId,
c.last_name,
c.address_line_1 ,
c.city,
c.abbr,
c.zip,
c.Member_ID,
c.pat_last_name,
pat_first_name,
c.Member_Street_Address_1,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.GENDER,
c.ProductOrServiceQualifier,
c.ProcedureCode,
c.DGS,
c.diag_type01,
opdx1.dx as dx_1,
case when opdx2.dx is not null and c.diag_type02 IS null
then'10'
else null
end diag_type02,
opdx2.dx as dx_2,
case when opdx3.dx is not null and c.diag_type03 IS null
then'10'
else null
end diag_type03,
opdx3.dx as dx_3,
case when opdx4.dx is not null and c.diag_type04 IS null
then'10'
else null
end diag_type04,
opdx4.dx as dx_4,
case when opdx5.dx is not null and c.diag_type05 IS null
then'10'
else null
end diag_type05,
opdx5.dx as dx_5,
case when opdx6.dx is not null and c.diag_type06 IS null
then'10'
else null
end diag_type06,
opdx6.dx as dx_6,
case when opdx7.dx is not null and c.diag_type07 IS null
then'10'
else null
end diag_type07,
opdx7.dx as dx_7,
case when opdx8.dx is not null and c.diag_type08 IS null
then'10'
else null
end diag_type08,
opdx8.dx as dx_8,
case when opdx9.dx is not null and c.diag_type09 IS null
then'10'
else null
end diag_type09,
opdx9.dx as dx_9,
case when opdx10.dx is not null and c.diag_type10 IS null
then'10'
else null
end diag_type10,
opdx10.dx as dx_10,
case when opdx11.dx is not null and c.diag_type11 IS null
then'10'
else null
end diag_type11,
opdx11.dx as dx_11,
case when opdx12.dx is not null and c.diag_type12 IS null
then'10'
else null
end diag_type12,
opdx12.dx as dx_12
from cohert c
  left join  bcbsok_OP_DX_query opdx1 on opdx1.inv_num = c.inv_num      
                       and opdx1.DOS_FROM = c.DOS_FROM
                       and  opdx1.DOS_Through = c.DOS_Through  
                       and   opdx1.ProcedureCode = c.ProcedureCode
                        and  opdx1.line = 1                   
   left join  bcbsok_OP_DX_query opdx2 on opdx2.inv_num = c.inv_num      
                       and opdx2.DOS_FROM = c.DOS_FROM
                       and  opdx2.DOS_Through = c.DOS_Through  
                       and   opdx2.ProcedureCode = c.ProcedureCode
                        and  opdx2.line = 2                                     
   left join  bcbsok_OP_DX_query opdx3 on opdx3.inv_num = c.inv_num      
                       and opdx3.DOS_FROM = c.DOS_FROM
                       and  opdx3.DOS_Through = c.DOS_Through  
                       and   opdx3.ProcedureCode = c.ProcedureCode
                        and  opdx3.line = 3   
    left join  bcbsok_OP_DX_query opdx4 on opdx4.inv_num = c.inv_num      
                       and opdx4.DOS_FROM = c.DOS_FROM
                       and  opdx4.DOS_Through = c.DOS_Through  
                       and   opdx4.ProcedureCode = c.ProcedureCode
                        and  opdx4.line = 4   
   left join  bcbsok_OP_DX_query opdx5 on opdx5.inv_num = c.inv_num      
                       and opdx5.DOS_FROM = c.DOS_FROM
                       and  opdx5.DOS_Through = c.DOS_Through  
                       and   opdx5.ProcedureCode = c.ProcedureCode
                        and  opdx5.line = 5   
   left join  bcbsok_OP_DX_query opdx6 on opdx6.inv_num = c.inv_num      
                       and opdx6.DOS_FROM = c.DOS_FROM
                       and  opdx6.DOS_Through = c.DOS_Through  
                       and   opdx6.ProcedureCode = c.ProcedureCode
                        and  opdx6.line = 6   
   left join  bcbsok_OP_DX_query opdx7 on opdx7.inv_num = c.inv_num      
                       and opdx7.DOS_FROM = c.DOS_FROM
                       and  opdx7.DOS_Through = c.DOS_Through  
                       and   opdx7.ProcedureCode = c.ProcedureCode
                        and  opdx7.line = 7   
   left join  bcbsok_OP_DX_query opdx8 on opdx8.inv_num = c.inv_num      
                       and opdx8.DOS_FROM = c.DOS_FROM
                       and  opdx8.DOS_Through = c.DOS_Through  
                       and   opdx8.ProcedureCode = c.ProcedureCode
                        and  opdx8.line = 8   
   left join  bcbsok_OP_DX_query opdx9 on opdx9.inv_num = c.inv_num      
                       and opdx9.DOS_FROM = c.DOS_FROM
                       and  opdx9.DOS_Through = c.DOS_Through  
                       and   opdx9.ProcedureCode = c.ProcedureCode
                        and  opdx9.line = 9   
   left join  bcbsok_OP_DX_query opdx10 on opdx10.inv_num = c.inv_num      
                       and opdx10.DOS_FROM = c.DOS_FROM
                       and  opdx10.DOS_Through = c.DOS_Through  
                       and   opdx10.ProcedureCode = c.ProcedureCode
                        and  opdx10.line = 10   
   left join  bcbsok_OP_DX_query opdx11 on opdx11.inv_num = c.inv_num      
                       and opdx11.DOS_FROM = c.DOS_FROM
                       and  opdx11.DOS_Through = c.DOS_Through  
                       and   opdx11.ProcedureCode = c.ProcedureCode
                        and  opdx11.line = 11   
   left join  bcbsok_OP_DX_query opdx12 on opdx12.inv_num = c.inv_num      
                       and opdx12.DOS_FROM = c.DOS_FROM
                       and  opdx12.DOS_Through = c.DOS_Through  
                       and   opdx12.ProcedureCode = c.ProcedureCode
                        and  opdx12.line = 12    
                        



_____________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 13-24 dx codes.






with cohert as(

select distinct 
opdx.inv_num,
'CR' as recordid,
plan_id,
claim_id_a,
CMS_ICN,
ChartReviewReferenceId,
FrequencyCode, 
ProviderTaxonomyCode,
HICN,
DOB,
opdx.DOS_FROM,
opdx.DOS_Through,
POS,
BillingProviderNPI,
BillingProviderTaxId,
last_name,
address_line_1,
city,
abbr,
zip,
Member_ID,
pat_last_name,
pat_first_name,
Member_Street_Address_1,
Member_City,
Member_State_Code,
Member_Zip_Code,
GENDER,
ProductOrServiceQualifier,
opdx.ProcedureCode,
'DGS' DGS,
'10' diag_type01,
diag_type02,
diag_type03,
diag_type04,
diag_type05,
diag_type06,
diag_type07,
diag_type08,
diag_type09,
diag_type10,
diag_type11,
diag_type12
 from
 bcbsok_OP_DX_query opdx
 join bcbsok_main_query main on main.inv_num = opdx.inv_num
 and opdx.tx_id = main.tx_id
 where 1=1
 and opdx.line > 12

) 
select distinct 
c.inv_num,
c.recordid,
c.plan_id,
c.claim_id_a,
c.CMS_ICN,
c.ChartReviewReferenceId,
c.FrequencyCode, 
c.ProviderTaxonomyCode,
c.HICN,
c.DOB,
c.DOS_FROM,
c.DOS_Through,
c.POS,
c.BillingProviderNPI,
c.BillingProviderTaxId,
c.last_name,
c.address_line_1 ,
c.city,
c.abbr,
c.zip,
c.Member_ID,
c.pat_last_name,
c.pat_first_name,
c.Member_Street_Address_1,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.GENDER,
c.ProductOrServiceQualifier,
c.ProcedureCode,
c.DGS,
c.diag_type01,
opdx13.dx as dx_1,
case when opdx14.dx is not null and c.diag_type02 IS null
then'10'
else null
end diag_type02,
opdx14.dx as dx_2,
case when opdx15.dx is not null and c.diag_type03 IS null
then'10'
else null
end diag_type03,
opdx15.dx as dx_3,
case when opdx16.dx is not null and c.diag_type04 IS null
then'10'
else null
end diag_type04,
opdx16.dx as dx_4,
case when opdx17.dx is not null and c.diag_type05 IS null
then'10'
else null
end diag_type05,
opdx17.dx as dx_5,
case when opdx18.dx is not null and c.diag_type06 IS null
then'10'
else null
end diag_type06,
opdx18.dx as dx_6,
case when opdx19.dx is not null and c.diag_type07 IS null
then'10'
else null
end diag_type07,
opdx19.dx as dx_7,
case when opdx20.dx is not null and c.diag_type08 IS null
then'10'
else null
end diag_type08,
opdx20.dx as dx_8,
case when opdx21.dx is not null and c.diag_type09 IS null
then'10'
else null
end diag_type09,
opdx21.dx as dx_9,
case when opdx22.dx is not null and c.diag_type10 IS null
then'10'
else null
end diag_type02,
opdx22.dx as dx_10,
case when opdx23.dx is not null and c.diag_type11 IS null
then'10'
else null
end diag_type02,
opdx23.dx as dx_11,
case when opdx24.dx is not null and c.diag_type12 IS null
then'10'
else null
end diag_type02,
opdx24.dx as dx_12
from cohert c

   left join  bcbsok_OP_DX_query opdx13 on opdx13.inv_num = c.inv_num      
                       and opdx13.DOS_FROM = c.DOS_FROM
                       and  opdx13.DOS_Through = c.DOS_Through  
                       and   opdx13.ProcedureCode = c.ProcedureCode
                        and  opdx13.line = 13   
   left join  bcbsok_OP_DX_query opdx14 on opdx14.inv_num = c.inv_num      
                       and opdx14.DOS_FROM = c.DOS_FROM
                       and  opdx14.DOS_Through = c.DOS_Through  
                       and   opdx14.ProcedureCode = c.ProcedureCode
                       and  opdx14.line = 14   
   left join  bcbsok_OP_DX_query opdx15 on opdx15.inv_num = c.inv_num      
                       and opdx15.DOS_FROM = c.DOS_FROM
                       and  opdx15.DOS_Through = c.DOS_Through  
                       and   opdx15.ProcedureCode = c.ProcedureCode
                        and  opdx15.line = 15   
   left join  bcbsok_OP_DX_query opdx16 on opdx16.inv_num = c.inv_num      
                       and opdx16.DOS_FROM = c.DOS_FROM
                       and  opdx16.DOS_Through = c.DOS_Through  
                       and   opdx16.ProcedureCode = c.ProcedureCode
                        and  opdx16.line = 16   
    left join  bcbsok_OP_DX_query opdx17 on opdx17.inv_num = c.inv_num      
                       and opdx17.DOS_FROM = c.DOS_FROM
                       and  opdx17.DOS_Through = c.DOS_Through  
                       and   opdx17.ProcedureCode = c.ProcedureCode
                        and  opdx17.line = 17   
   left join  bcbsok_OP_DX_query opdx18 on opdx18.inv_num = c.inv_num      
                       and opdx18.DOS_FROM = c.DOS_FROM
                       and  opdx18.DOS_Through = c.DOS_Through  
                       and   opdx18.ProcedureCode = c.ProcedureCode
                        and  opdx18.line = 18   
   left join  bcbsok_OP_DX_query opdx19 on opdx19.inv_num = c.inv_num      
                       and opdx19.DOS_FROM = c.DOS_FROM
                       and  opdx19.DOS_Through = c.DOS_Through  
                       and   opdx19.ProcedureCode = c.ProcedureCode
                        and  opdx19.line = 19   
   left join  bcbsok_OP_DX_query opdx20 on opdx20.inv_num = c.inv_num      
                       and opdx20.DOS_FROM = c.DOS_FROM
                       and  opdx20.DOS_Through = c.DOS_Through  
                       and   opdx20.ProcedureCode = c.ProcedureCode
                        and  opdx20.line = 20   
   left join  bcbsok_OP_DX_query opdx21 on opdx21.inv_num = c.inv_num      
                       and opdx21.DOS_FROM = c.DOS_FROM
                       and  opdx21.DOS_Through = c.DOS_Through  
                       and   opdx21.ProcedureCode = c.ProcedureCode
                        and  opdx21.line = 21   
   left join  bcbsok_OP_DX_query opdx22 on opdx22.inv_num = c.inv_num      
                       and opdx22.DOS_FROM = c.DOS_FROM
                       and  opdx22.DOS_Through = c.DOS_Through  
                       and   opdx22.ProcedureCode = c.ProcedureCode
                        and  opdx22.line = 22   
   left join  bcbsok_OP_DX_query opdx23 on opdx23.inv_num = c.inv_num      
                       and opdx23.DOS_FROM = c.DOS_FROM
                       and  opdx23.DOS_Through = c.DOS_Through  
                       and   opdx23.ProcedureCode = c.ProcedureCode
                        and  opdx23.line = 23   
   left join  bcbsok_OP_DX_query opdx24 on opdx24.inv_num = c.inv_num      
                       and opdx24.DOS_FROM = c.DOS_FROM
                       and  opdx24.DOS_Through = c.DOS_Through  
                       and   opdx24.ProcedureCode = c.ProcedureCode
                        and  opdx24.line = 24   

_______________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 25-36 dx codes.


with cohert as(

select distinct 
opdx.inv_num,
'CR' as recordid,
plan_id,
claim_id_a,
CMS_ICN,
ChartReviewReferenceId,
FrequencyCode, 
ProviderTaxonomyCode,
HICN,
DOB,
opdx.DOS_FROM,
opdx.DOS_Through,
POS,
BillingProviderNPI,
BillingProviderTaxId,
last_name,
address_line_1,
city,
abbr,
zip,
Member_ID,
pat_last_name,
pat_first_name,
Member_Street_Address_1,
Member_City,
Member_State_Code,
Member_Zip_Code,
GENDER,
ProductOrServiceQualifier,
opdx.ProcedureCode,
'DGS' DGS,
'10' diag_type01,
diag_type02,
diag_type03,
diag_type04,
diag_type05,
diag_type06,
diag_type07,
diag_type08,
diag_type09,
diag_type10,
diag_type11,
diag_type12
 from
 bcbsok_OP_DX_query opdx
 join bcbsok_main_query main on main.inv_num = opdx.inv_num
 and opdx.tx_id = main.tx_id
 where 1=1
 and opdx.line > 24
) 
select distinct 
c.inv_num,
c.recordid,
c.plan_id,
c.claim_id_a,
c.CMS_ICN,
c.ChartReviewReferenceId,
c.FrequencyCode, 
c.ProviderTaxonomyCode,
c.HICN,
c.DOB,
c.DOS_FROM,
c.DOS_Through,
c.POS,
c.BillingProviderNPI,
c.BillingProviderTaxId,
c.last_name,
c.address_line_1,
city,
abbr,
zip,
c.Member_ID,
c.pat_last_name,
c.pat_first_name,
c.Member_Street_Address_1,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.GENDER,
c.ProductOrServiceQualifier,
c.ProcedureCode,
c.DGS,
c.diag_type01,
opdx25.dx as dx_1,
case when opdx26.dx is not null and c.diag_type02 IS null
then'10'
else null
end diag_type02,
opdx26.dx as dx_2,
case when opdx27.dx is not null and c.diag_type03 IS null
then'10'
else null
end diag_type03,
opdx27.dx as dx_3,
case when opdx28.dx is not null and c.diag_type03 IS null
then'10'
else null
end diag_type04,
opdx28.dx as dx_4,
case when opdx29.dx is not null and c.diag_type05 IS null
then'10'
else null
end diag_type05,
opdx29.dx as dx_5,
case when opdx30.dx is not null and c.diag_type06 IS null
then'10'
else null
end diag_type06,
opdx30.dx as dx_6,
case when opdx31.dx is not null and c.diag_type07 IS null
then'10'
else null
end diag_type07,
opdx31.dx as dx_7,
case when opdx32.dx is not null and c.diag_type08 IS null
then'10'
else null
end diag_type08,
opdx32.dx as dx_8,
case when opdx33.dx is not null and c.diag_type09 IS null
then'10'
else null
end diag_type09,
opdx33.dx as dx_9,
case when opdx34.dx is not null and c.diag_type10 IS null
then'10'
else null
end diag_type10,
opdx34.dx as dx_10,
case when opdx35.dx is not null and c.diag_type11 IS null
then'10'
else null
end diag_type11,
opdx35.dx as dx_11,
case when opdx36.dx is not null and c.diag_type12 IS null
then'10'
else null
end diag_type12,
opdx36.dx as dx_12
from cohert c

   left join  bcbsok_OP_DX_query opdx25 on opdx25.inv_num = c.inv_num      
                       and opdx25.DOS_FROM = c.DOS_FROM
                       and  opdx25.DOS_Through = c.DOS_Through  
                       and   opdx25.ProcedureCode = c.ProcedureCode
                        and  opdx25.line = 25  
     left join  bcbsok_OP_DX_query opdx26 on opdx26.inv_num = c.inv_num      
                       and opdx26.DOS_FROM = c.DOS_FROM
                       and  opdx26.DOS_Through = c.DOS_Through  
                       and   opdx26.ProcedureCode = c.ProcedureCode
                        and  opdx26.line = 26 
   left join  bcbsok_OP_DX_query opdx27 on opdx27.inv_num = c.inv_num      
                       and opdx27.DOS_FROM = c.DOS_FROM
                       and  opdx27.DOS_Through = c.DOS_Through  
                       and   opdx27.ProcedureCode = c.ProcedureCode
                        and  opdx27.line = 27   
   left join  bcbsok_OP_DX_query opdx28 on opdx28.inv_num = c.inv_num      
                       and opdx28.DOS_FROM = c.DOS_FROM
                       and  opdx28.DOS_Through = c.DOS_Through  
                       and   opdx28.ProcedureCode = c.ProcedureCode
                        and  opdx28.line = 28   
   left join  bcbsok_OP_DX_query opdx29 on opdx29.inv_num = c.inv_num      
                       and opdx29.DOS_FROM = c.DOS_FROM
                       and  opdx29.DOS_Through = c.DOS_Through  
                       and   opdx29.ProcedureCode = c.ProcedureCode
                        and  opdx29.line = 29   
   left join  bcbsok_OP_DX_query opdx30 on opdx30.inv_num = c.inv_num      
                       and opdx30.DOS_FROM = c.DOS_FROM
                       and  opdx30.DOS_Through = c.DOS_Through  
                       and   opdx30.ProcedureCode = c.ProcedureCode
                        and  opdx30.line = 30   
   left join  bcbsok_OP_DX_query opdx31 on opdx31.inv_num = c.inv_num      
                       and opdx31.DOS_FROM = c.DOS_FROM
                       and  opdx31.DOS_Through = c.DOS_Through  
                       and   opdx31.ProcedureCode = c.ProcedureCode
                        and  opdx31.line = 31   
   left join  bcbsok_OP_DX_query opdx32 on opdx32.inv_num = c.inv_num      
                       and opdx32.DOS_FROM = c.DOS_FROM
                       and  opdx32.DOS_Through = c.DOS_Through  
                       and   opdx32.ProcedureCode = c.ProcedureCode
                        and  opdx32.line = 32   
   left join  bcbsok_OP_DX_query opdx33 on opdx33.inv_num = c.inv_num      
                       and opdx33.DOS_FROM = c.DOS_FROM
                       and  opdx33.DOS_Through = c.DOS_Through  
                       and   opdx33.ProcedureCode = c.ProcedureCode
                        and  opdx33.line = 33   
   left join  bcbsok_OP_DX_query opdx34 on opdx34.inv_num = c.inv_num      
                       and opdx34.DOS_FROM = c.DOS_FROM
                       and  opdx34.DOS_Through = c.DOS_Through  
                       and   opdx34.ProcedureCode = c.ProcedureCode
                        and  opdx34.line = 34   
   left join  bcbsok_OP_DX_query opdx35 on opdx35.inv_num = c.inv_num      
                       and opdx35.DOS_FROM = c.DOS_FROM
                       and  opdx35.DOS_Through = c.DOS_Through  
                       and   opdx35.ProcedureCode = c.ProcedureCode
                        and  opdx35.line = 35  
 left join  bcbsok_OP_DX_query opdx36 on opdx36.inv_num = c.inv_num      
                       and opdx36.DOS_FROM = c.DOS_FROM
                       and  opdx36.DOS_Through = c.DOS_Through  
                       and   opdx36.ProcedureCode = c.ProcedureCode
                        and  opdx36.line = 36   

