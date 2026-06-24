--drop table Humana_main_query;

create table Humana_main_query as

select distinct
ha.hsp_account_Id  Encounter_ID,  -- need for validation
pat.pat_first_name MEMBER_FIRST_NAME,-- need for vailadation
pat.pat_last_name  MEMBER_LAST_NAME, --need for validation
'I'  Claim_Type,
case
            when length(substr(replace(cvg.subscr_num, ',', ''), 1, 11)) = 9
                then substr(replace(cvg.subscr_num, ',', ''), 1, 9) || '00'
            else substr(replace(cvg.subscr_num, ',', ''), 1, 9)
        end  UMID,
to_char(pat.birth_date,'YYYYMMDD') MEMBER_DATE_OF_BIRTH,
cv.bil_prov_taxid  BILLING_PROVIDER_TAX_ID_NUMBER,
cv.bil_prov_npi  RENDERING_PROVIDER_NPI,
to_char(ha.adm_date_time,'YYYYMMDD')   DOS_FROM,
to_char(ha.disch_date_time,'YYYYMMDD')  DOS_THROUGH
from clarity.clm_value_record cvr
join clarity.clm_values cv on cvr.record_id = cv.record_id
join clarity.svc_ln_info sli on cvr.record_id = sli.record_id
JOIN HSP_CLAIM_DETAIL2 HCD ON CVR.RECORD_ID = HCD.CLM_EXT_VAL_ID 
inner join hsp_bucket bkt on hcd.hlb_id=bkt.bucket_id
inner join hsp_account ha on bkt.hsp_account_id = ha.hsp_account_id
JOIN COVERAGE CVG ON HCD.SG_CVG_ID = CVG.coverage_id
join patient pat on HCD.sg_pat_ID = pat.pat_id
JOIN clarity.clarity_loc loc on HCD.SG_loc_id = LOC.LOC_ID
where 1=1
 and cvr.clm_typ_c = 2 ---- Institutional Claim 
---------and cvr.record_id = 44966417
and bkt.bkt_sts_ha_c != 8  --rejected--
and (cv.bill_typ_fac_cd in (11, 12, 18) or
(cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85) 
)
)
and sli.line = 1
and (sli.ln_proc_cd in (select distinct proc_code from lareed4.sweepS_cpt_hcpcs_list_2025)
     or sli.ln_proc_cd is null)
--and HCD.SG_loc_id in (20001, --    PARENT MERCY HOSPITAL ST LOUIS  ------------east
--20002, --    PARENT MERCY HOSPITAL WASHINGTON  
-- 20003, --     PARENT MERCY REHABILITATION HOSPITAL ST LOUIS
-- 20008, ---     PARENT MERCY REHABILITATION HOSPITAL SOUTH
--20004, --    PARENT MERCY HOSPITAL JEFFERSON   
--20006, --    PARENT MERCY HOSPITAL LINCOLN   
--20007,   --PARENT MERCY HOSPITAL SOUTH
--20010,  --PARENT MERCY HOSPITAL PERRY
--20012)  --PARENT MERCY HOSPITAL SOUTHEAST
--and HCD.SG_loc_id in (50001, --       PARENT MERCY HOSPITAL HEALDTON    ---OKC
--50003, --              PARENT MERCY HOSPITAL OKLAHOMA CITY
--50004, --              PARENT MERCY HOSPITAL ARDMORE
--50005, --              PARENT MERCY HOSPITAL TISHOMINGO
--50006, --              PARENT MERCY HOSPITAL WATONGA
--50007, --              PARENT MERCY HOSPITAL ADA
--50009, --              PARENT MERCY HOSPITAL LOGAN COUNTY
--50011) --              PARENT MERCY HOSPITAL KINGFISHER 
--and HCD.SG_loc_id in (40006,    --    PARENT MERCY ST FRANCIS HOSPITAL  ------------------sgf
--40001,--    PARENT MERCY HOSPITAL SPRINGFIELD   
--40002,--    PARENT MERCY HOSPITAL LEBANON   
--40003,--    PARENT MERCY HOSPITAL AURORA   
--40004,--    PARENT MERCY HOSPITAL BERRYVILLE   
--40005, --    PARENT MERCY HOSPITAL CASSVILLE   
--90003,  --PARENT MERCY HOSPITAL CARTHAGE
--90001,   -- PARENT MERCY HOSPITAL JOPLIN
--90002, --PARENT MERCY HOSPITAL PITTSBURG
--90005,---- PARENT MERCY SPECIALTY HOSPITAL SOUTHEAST KANSAS
--90004  )--PARENT MERCY MAUDE NORTON HOSPITAL COLUMBUS
--and HCD.SG_loc_id = 80001 ----------------------    PARENT MERCY HOSPITAL NWA  
and HCD.SG_loc_id in (70004,-------------------	PARENT MERCY HOSPITAL FORT SMITH
'70001', ---PARENT MERCY HOSPITAL WALDRON
'70002', ---PARENT MERCY HOSPITAL PARIS
'70003', ------PARENT MERCY HOSPITAL OZARK
'70005')   ---PARENT MERCY HOSPITAL BOONEVILLE
and HCD.UB_THROUGH_DT >= '01-JAN-25'
and HCD.UB_THROUGH_DT < '01-JAN-26'
and HCD.SG_plan_id in (2000701 --          ADVANTRA FREEDOM PPO MCR         
,2019401              --HUMANA PPO MCR                   
,2019402              --HUMANA GOLD PLUS HMO MCR         
,2019403              --HUMANA GOLD PLUS HMO SNP MCR     
,2019404              --HUMANA GOLD CHOICE MCR           
,2019405              --HUMANA GOLD CHOICE PFFS MCR      
,2019406              --HUMANA CHOICE PPO MCR            
,2019407              --HUMANA MCR                       
,2019408              --HUMANA MEDICARE ADVANTAGE PPO    
,2019409              --HUMANA GOLD PLUS H0028016 HMO    
,2019410              --HUMANA GOLD PLUS H4623001 HMO    
,2019411              --HUMANA GOLD PLUS H5619111 HMO
,2019417              --HUMANA HMO MCR MA    
,32000701--         ADVANTRA FREEDOM PPO MCR CONTRACTED         
,32019401--         HUMANA PPO MCR CONTRACTED                   
,32019402--         HUMANA GOLD PLUS HMO MCR CONTRACTED         
,32019403--         HUMANA GOLD PLUS HMO SNP MCR CONTRACTED     
,32019404--         HUMANA GOLD CHOICE MCR CONTRACTED           
,32019405--         HUMANA GOLD CHOICE PFFS MCR CONTRACTED      
,32019406--         HUMANA CHOICE PPO MCR CONTRACTED            
,32019407--         HUMANA MCR CONTRACTED                       
,32019408---       HUMANA MEDICARE ADVANTAGE PPO CONTRACTED    
,32019409---       HUMANA GOLD PLUS H0028016 HMO CONTRACTED    
,32019410---       HUMANA GOLD PLUS H4623001 HMO CONTRACTED    
,32019411---       HUMANA GOLD PLUS H5619111 HMO CONTRACTED
,32019417)---      HUMANA HMO MCR CONTRACTED



_________________________________________________________________________________________________________________________________________________________

---- Humana_IP_DX_query



--drop table humana_IP_DX_query;

create table humana_IP_DX_query as
select distinct main."Encounter ID",
main."DOS FROM",
main."DOS THROUGH",
replace(edg.ref_bill_code,'.','')as dx,
hadx.line
from Humana_main_query main 
join hsp_acct_dx_list hadx on main.'Encounter_ID' = hadx.hsp_account_id
 join clarity_edg edg on hadx.dx_id = edg.dx_id
 where 1=1
order by hadx.line

_________________________________________________________________________________________________________________________________________________________


with cohert as(
select distinct 
ipdx.Encounter_ID Encounter_ID,
MEMBER_FIRST_NAME,
MEMBER_LAST_NAME,
UMID,
MEMBER_DATE_OF_BIRTH,
BILLING_PROVIDER_TAX_ID_NUMBER,
RENDERING_PROVIDER_NPI,
ipdx.DOS_FROM,
ipdx.DOS_THROUGH
 from
 humana_ip_dx_query ipdx
 join humana_main_query main on main.Encounter_ID = ipdx.Encounter_ID
 where 1=1
) 
select distinct 
c.Encounter_ID,
c.MEMBER_FIRST_NAME,
c.MEMBER_LAST_NAME,
c.UMID,
c.MEMBER_DATE_OF_BIRTH,
c.BILLING_PROVIDER_TAX_ID_NUMBER,
c.RENDERING_PROVIDER_NPI,
C.DOS_FROM,
C.DOS_THROUGH,
ipdx1.dx as dx_1,
ipdx2.dx as dx_2,
ipdx3.dx as dx_3,
ipdx4.dx as dx_4,
ipdx5.dx as dx_5,
ipdx6.dx as dx_6,
ipdx7.dx as dx_7,
ipdx8.dx as dx_8,
ipdx9.dx as dx_9,
ipdx10.dx as dx_10,
ipdx11.dx as dx_11,
ipdx12.dx as dx_12,
ipdx13.dx as dx_13,
ipdx14.dx as dx_14,
ipdx15.dx as dx_15,
ipdx16.dx as dx_16,
ipdx17.dx as dx_17,
ipdx18.dx as dx_18,
ipdx19.dx as dx_19,
ipdx20.dx as dx_20,
ipdx21.dx as dx_21,
ipdx22.dx as dx_22,
ipdx23.dx as dx_23,
ipdx24.dx as dx_24
      from cohert c
  left join humana_ip_dx_query ipdx1 on ipdx1.Encounter_ID = c.Encounter_ID      
                       and ipdx1.DOS_FROM = c.DOS_FROM
                       and  ipdx1.DOS_THROUGH = c.DOS_THROUGH  
                    --   and   ipdx1. = c.cpt
                        and  ipdx1.line = 1                   
   left join humana_ip_dx_query ipdx2 on ipdx2.Encounter_ID = c.Encounter_ID      
                       and ipdx2.DOS_FROM = c.DOS_FROM
                       and  ipdx2.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx2.cpt = c.cpt
                        and  ipdx2.line = 2                                     
   left join humana_ip_dx_query ipdx3 on ipdx3.Encounter_ID = c.Encounter_ID      
                       and ipdx3.DOS_FROM = c.DOS_FROM
                       and  ipdx3.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx3.cpt = c.cpt
                        and  ipdx3.line = 3   
    left join humana_ip_dx_query ipdx4 on ipdx4.Encounter_ID = c.Encounter_ID      
                       and ipdx4.DOS_FROM = c.DOS_FROM
                       and  ipdx4.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx4.cpt = c.cpt
                        and  ipdx4.line = 4   
   left join humana_ip_dx_query ipdx5 on ipdx5.Encounter_ID = c.Encounter_ID      
                       and ipdx5.DOS_FROM = c.DOS_FROM
                       and  ipdx5.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx5.cpt = c.cpt
                        and  ipdx5.line = 5   
   left join humana_ip_dx_query ipdx6 on ipdx6.Encounter_ID = c.Encounter_ID      
                       and ipdx6.DOS_FROM = c.DOS_FROM
                       and  ipdx6.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx6.cpt = c.cpt
                        and  ipdx6.line = 6   
   left join humana_ip_dx_query ipdx7 on ipdx7.Encounter_ID = c.Encounter_ID      
                       and ipdx7.DOS_FROM = c.DOS_FROM
                       and  ipdx7.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx7.cpt = c.cpt
                        and  ipdx7.line = 7   
   left join humana_ip_dx_query ipdx8 on ipdx8.Encounter_ID = c.Encounter_ID      
                       and ipdx8.DOS_FROM = c.DOS_FROM
                       and  ipdx8.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx8.cpt = c.cpt
                        and  ipdx8.line = 8   
   left join humana_ip_dx_query ipdx9 on ipdx9.Encounter_ID = c.Encounter_ID      
                       and ipdx9.DOS_FROM = c.DOS_FROM
                       and  ipdx9.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx9.cpt = c.cpt
                        and  ipdx9.line = 9   
   left join humana_ip_dx_query ipdx10 on ipdx10.Encounter_ID = c.Encounter_ID      
                       and ipdx10.DOS_FROM = c.DOS_FROM
                       and  ipdx10.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx10.cpt = c.cpt
                        and  ipdx10.line = 10   
   left join humana_ip_dx_query ipdx11 on ipdx11.Encounter_ID = c.Encounter_ID      
                       and ipdx11.DOS_FROM = c.DOS_FROM
                       and  ipdx11.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx11.cpt = c.cpt
                        and  ipdx11.line = 11   
   left join humana_ip_dx_query ipdx12 on ipdx12.Encounter_ID = c.Encounter_ID      
                       and ipdx12.DOS_FROM = c.DOS_FROM
                       and  ipdx12.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx12.cpt = c.cpt
                        and  ipdx12.line = 12   
   left join humana_ip_dx_query ipdx13 on ipdx13.Encounter_ID = c.Encounter_ID      
                       and ipdx13.DOS_FROM = c.DOS_FROM
                       and  ipdx13.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx13.cpt = c.cpt
                        and  ipdx13.line = 13   
   left join humana_ip_dx_query ipdx14 on ipdx14.Encounter_ID = c.Encounter_ID      
                       and ipdx14.DOS_FROM = c.DOS_FROM
                       and  ipdx14.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx14.cpt = c.cpt
                       and  ipdx14.line = 14   
   left join humana_ip_dx_query ipdx15 on ipdx15.Encounter_ID = c.Encounter_ID      
                       and ipdx15.DOS_FROM = c.DOS_FROM
                       and  ipdx15.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx15.cpt = c.cpt
                        and  ipdx15.line = 15   
   left join humana_ip_dx_query ipdx16 on ipdx16.Encounter_ID = c.Encounter_ID      
                       and ipdx16.DOS_FROM = c.DOS_FROM
                       and  ipdx16.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx16.cpt = c.cpt
                        and  ipdx16.line = 16   
    left join humana_ip_dx_query ipdx17 on ipdx17.Encounter_ID = c.Encounter_ID      
                       and ipdx17.DOS_FROM = c.DOS_FROM
                       and  ipdx17.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx17.cpt = c.cpt
                        and  ipdx17.line = 17   
   left join humana_ip_dx_query ipdx18 on ipdx18.Encounter_ID = c.Encounter_ID      
                       and ipdx18.DOS_FROM = c.DOS_FROM
                       and  ipdx18.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx18.cpt = c.cpt
                        and  ipdx18.line = 18   
   left join humana_ip_dx_query ipdx19 on ipdx19.Encounter_ID = c.Encounter_ID      
                       and ipdx19.DOS_FROM = c.DOS_FROM
                       and  ipdx19.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx19.cpt = c.cpt
                        and  ipdx19.line = 19   
   left join humana_ip_dx_query ipdx20 on ipdx20.Encounter_ID = c.Encounter_ID      
                       and ipdx20.DOS_FROM = c.DOS_FROM
                       and  ipdx20.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx20.cpt = c.cpt
                        and  ipdx20.line = 20   
   left join humana_ip_dx_query ipdx21 on ipdx21.Encounter_ID = c.Encounter_ID      
                       and ipdx21.DOS_FROM = c.DOS_FROM
                       and  ipdx21.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx21.cpt = c.cpt
                        and  ipdx21.line = 21   
   left join humana_ip_dx_query ipdx22 on ipdx22.Encounter_ID = c.Encounter_ID      
                       and ipdx22.DOS_FROM = c.DOS_FROM
                       and  ipdx22.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx22.cpt = c.cpt
                        and  ipdx22.line = 22   
   left join humana_ip_dx_query ipdx23 on ipdx23.Encounter_ID = c.Encounter_ID      
                       and ipdx23.DOS_FROM = c.DOS_FROM
                       and  ipdx23.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx23.cpt = c.cpt
                        and  ipdx23.line = 23   
   left join humana_ip_dx_query ipdx24 on ipdx24.Encounter_ID = c.Encounter_ID      
                       and ipdx24.DOS_FROM = c.DOS_FROM
                       and  ipdx24.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx24.cpt = c.cpt
                        and  ipdx24.line = 24   
__________________________________________________________________________________________________________________________________________________________


---humana next 24 lines of DX codes 25-48


with cohert as(
select distinct 
ipdx.Encounter_ID Encounter_ID,
MEMBER_FIRST_NAME,
MEMBER_LAST_NAME,
UMID,
MEMBER_DATE_OF_BIRTH,
BILLING_PROVIDER_TAX_ID_NUMBER,
RENDERING_PROVIDER_NPI,
ipdx.DOS_FROM,
ipdx.DOS_THROUGH
 from
 humana_ip_dx_query ipdx
 join humana_main_query main on main.Encounter_ID = ipdx.Encounter_ID
 where 1=1
and ipdx.line > 24

) 
select distinct 
c.Encounter_ID,
c.MEMBER_FIRST_NAME,
c.MEMBER_LAST_NAME,
c.UMID,
c.MEMBER_DATE_OF_BIRTH,
c.BILLING_PROVIDER_TAX_ID_NUMBER,
c.RENDERING_PROVIDER_NPI,
C.DOS_FROM,
C.DOS_THROUGH,
ipdx25.dx as dx_1,
ipdx26.dx as dx_2,
ipdx27.dx as dx_3,
ipdx28.dx as dx_4,
ipdx29.dx as dx_5,
ipdx30.dx as dx_6,
ipdx31.dx as dx_7,
ipdx32.dx as dx_8,
ipdx33.dx as dx_9,
ipdx34.dx as dx_10,
ipdx35.dx as dx_11,
ipdx36.dx as dx_12,
ipdx37.dx as dx_13,
ipdx38.dx as dx_14,
ipdx39.dx as dx_15,
ipdx40.dx as dx_16,
ipdx41.dx as dx_17,
ipdx42.dx as dx_18,
ipdx43.dx as dx_19,
ipdx44.dx as dx_20,
ipdx45.dx as dx_21,
ipdx46.dx as dx_22,
ipdx47.dx as dx_23,
ipdx48.dx as dx_24
      from cohert c
    left join humana_ip_dx_query ipdx25 on ipdx25.Encounter_ID = c.Encounter_ID      
                       and ipdx25.DOS_FROM = c.DOS_FROM
                       and  ipdx25.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx25.cpt = c.cpt
                        and  ipdx25.line = 25  
     left join humana_ip_dx_query ipdx26 on ipdx26.Encounter_ID = c.Encounter_ID      
                       and ipdx26.DOS_FROM = c.DOS_FROM
                      and  ipdx26.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx26.cpt = c.cpt
                        and  ipdx26.line = 26 
   left join humana_ip_dx_query ipdx27 on ipdx27.Encounter_ID = c.Encounter_ID      
                       and ipdx27.DOS_FROM = c.DOS_FROM
                       and  ipdx27.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx27.cpt = c.cpt
                        and  ipdx27.line = 27   
   left join humana_ip_dx_query ipdx28 on ipdx28.Encounter_ID = c.Encounter_ID      
                       and ipdx28.DOS_FROM = c.DOS_FROM
                       and  ipdx28.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx28.cpt = c.cpt
                        and  ipdx28.line = 28   
   left join humana_ip_dx_query ipdx29 on ipdx29.Encounter_ID = c.Encounter_ID      
                       and ipdx29.DOS_FROM = c.DOS_FROM
                       and  ipdx29.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx29.cpt = c.cpt
                        and  ipdx29.line = 29   
   left join humana_ip_dx_query ipdx30 on ipdx30.Encounter_ID = c.Encounter_ID      
                       and ipdx30.DOS_FROM = c.DOS_FROM
                       and  ipdx30.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx30.cpt = c.cpt
                        and  ipdx30.line = 30   
   left join humana_ip_dx_query ipdx31 on ipdx31.Encounter_ID = c.Encounter_ID      
                       and ipdx31.DOS_FROM = c.DOS_FROM
                       and  ipdx31.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx31.cpt = c.cpt
                        and  ipdx31.line = 31   
   left join humana_ip_dx_query ipdx32 on ipdx32.Encounter_ID = c.Encounter_ID      
                       and ipdx32.DOS_FROM = c.DOS_FROM
                       and  ipdx32.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx32.cpt = c.cpt
                        and  ipdx32.line = 32   
   left join humana_ip_dx_query ipdx33 on ipdx33.Encounter_ID = c.Encounter_ID      
                       and ipdx33.DOS_FROM = c.DOS_FROM
                       and  ipdx33.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx33.cpt = c.cpt
                        and  ipdx33.line = 33   
   left join humana_ip_dx_query ipdx34 on ipdx34.Encounter_ID = c.Encounter_ID      
                       and ipdx34.DOS_FROM = c.DOS_FROM
                       and  ipdx34.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx34.cpt = c.cpt
                        and  ipdx34.line = 34   
   left join humana_ip_dx_query ipdx35 on ipdx35.Encounter_ID = c.Encounter_ID      
                       and ipdx35.DOS_FROM = c.DOS_FROM
                       and  ipdx35.DOS_THROUGH = c.DOS_THROUGH  
                      --and   ipdx35.cpt = c.cpt
                        and  ipdx35.line = 35  
 left join humana_ip_dx_query ipdx36 on ipdx36.Encounter_ID = c.Encounter_ID      
                       and ipdx36.DOS_FROM = c.DOS_FROM
                       and  ipdx36.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx36.cpt = c.cpt
                        and  ipdx36.line = 36   
 left join humana_ip_dx_query ipdx37 on ipdx37.Encounter_ID = c.Encounter_ID      
                       and ipdx37.DOS_FROM = c.DOS_FROM
                       and  ipdx37.DOS_THROUGH = c.DOS_THROUGH  
                      -- and   ipdx37.cpt = c.cpt
                        and  ipdx37.line = 37   
 left join humana_ip_dx_query ipdx38 on ipdx38.Encounter_ID = c.Encounter_ID      
                       and ipdx38.DOS_FROM = c.DOS_FROM
                       and  ipdx38.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx38.cpt = c.cpt
                        and  ipdx38.line = 38   
 left join humana_ip_dx_query ipdx39 on ipdx39.Encounter_ID = c.Encounter_ID      
                       and ipdx39.DOS_FROM = c.DOS_FROM
                       and  ipdx39.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx39.cpt = c.cpt
                        and  ipdx39.line = 39   
 left join humana_ip_dx_query ipdx40 on ipdx40.Encounter_ID = c.Encounter_ID      
                       and ipdx40.DOS_FROM = c.DOS_FROM
                       and  ipdx40.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx40.cpt = c.cpt
                       and  ipdx40.line = 40  
 left join humana_ip_dx_query ipdx41 on ipdx41.Encounter_ID = c.Encounter_ID      
                       and ipdx41.DOS_FROM = c.DOS_FROM
                       and  ipdx41.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx41.cpt = c.cpt
                       and  ipdx41.line = 41  
 left join humana_ip_dx_query ipdx42 on ipdx42.Encounter_ID = c.Encounter_ID      
                       and ipdx42.DOS_FROM = c.DOS_FROM
                       and  ipdx42.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx42.cpt = c.cpt
                       and  ipdx42.line = 42  
 left join humana_ip_dx_query ipdx43 on ipdx43.Encounter_ID = c.Encounter_ID      
                       and ipdx43.DOS_FROM = c.DOS_FROM
                       and  ipdx43.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx43.cpt = c.cpt
                       and  ipdx43.line = 43  
 left join humana_ip_dx_query ipdx44 on ipdx44.Encounter_ID = c.Encounter_ID      
                       and ipdx44.DOS_FROM = c.DOS_FROM
                       and  ipdx44.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx44.cpt = c.cpt
                       and  ipdx44.line = 44  
 left join humana_ip_dx_query ipdx45 on ipdx45.Encounter_ID = c.Encounter_ID      
                       and ipdx45.DOS_FROM = c.DOS_FROM
                       and  ipdx45.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx45.cpt = c.cpt
                       and  ipdx45.line = 45  
 left join humana_ip_dx_query ipdx46 on ipdx46.Encounter_ID = c.Encounter_ID      
                       and ipdx46.DOS_FROM = c.DOS_FROM
                       and  ipdx46.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx46.cpt = c.cpt
                       and  ipdx46.line = 46  
 left join humana_ip_dx_query ipdx47 on ipdx47.Encounter_ID = c.Encounter_ID      
                       and ipdx47.DOS_FROM = c.DOS_FROM
                       and  ipdx47.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx47.cpt = c.cpt
                       and  ipdx47.line = 47  
left join humana_ip_dx_query ipdx48 on ipdx48.Encounter_ID = c.Encounter_ID      
                       and ipdx48.DOS_FROM = c.DOS_FROM
                       and  ipdx48.DOS_THROUGH = c.DOS_THROUGH  
                       --and   ipdx48.cpt = c.cpt
                       and  ipdx48.line = 48  
________________________________________________________________________________________________________________________________________________________

---humana next 24 lines of DX codes 49-72

with cohert as(
select distinct 
ipdx.Encounter_ID Encounter_ID,
MEMBER_FIRST_NAME,
MEMBER_LAST_NAME,
UMID,
MEMBER_DATE_OF_BIRTH,
BILLING_PROVIDER_TAX_ID_NUMBER,
RENDERING_PROVIDER_NPI,
ipdx.DOS_FROM,
ipdx.DOS_THROUGH
 from
 humana_ip_dx_query ipdx
 join humana_main_query main on main.Encounter_ID = ipdx.Encounter_ID
 where 1=1
and ipdx.line > 48
) 
select distinct 
c.Encounter_ID,
c.MEMBER_FIRST_NAME,
c.MEMBER_LAST_NAME,
c.UMID,
c.MEMBER_DATE_OF_BIRTH,
c.BILLING_PROVIDER_TAX_ID_NUMBER,
c.RENDERING_PROVIDER_NPI,
C.DOS_FROM,
C.DOS_THROUGH,
ipdx49.dx as dx_1,
ipdx50.dx as dx_2,
ipdx51.dx as dx_3,
ipdx52.dx as dx_4,
ipdx53.dx as dx_5,
ipdx54.dx as dx_6,
ipdx55.dx as dx_7,
ipdx56.dx as dx_8,
ipdx57.dx as dx_9,
ipdx58.dx as dx_10,
ipdx59.dx as dx_11,
ipdx60.dx as dx_12,
ipdx61.dx as dx_13,
ipdx62.dx as dx_14,
ipdx63.dx as dx_15,
ipdx64.dx as dx_16,
ipdx65.dx as dx_17,
ipdx66.dx as dx_18,
ipdx67.dx as dx_19,
ipdx68.dx as dx_20,
ipdx69.dx as dx_21,
ipdx70.dx as dx_22,
ipdx71.dx as dx_23,
ipdx72.dx as dx_24

     from cohert c
     left join humana_ip_dx_query ipdx49 on ipdx49.Encounter_ID = c.Encounter_ID      
                       and ipdx49.DOS_FROM = c.DOS_FROM
                       and  ipdx49.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx49.cpt = c.cpt
                        and  ipdx49.line = 49  
     left join humana_ip_dx_query ipdx50 on ipdx50.Encounter_ID = c.Encounter_ID      
                       and ipdx50.DOS_FROM = c.DOS_FROM
                       and  ipdx50.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx50.cpt = c.cpt
                       and  ipdx50.line = 50 
     left join humana_ip_dx_query ipdx51 on ipdx51.Encounter_ID = c.Encounter_ID      
                       and ipdx51.DOS_FROM = c.DOS_FROM
                       and  ipdx51.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx51.cpt = c.cpt
                        and  ipdx51.line = 51 
     left join humana_ip_dx_query ipdx52 on ipdx52.Encounter_ID = c.Encounter_ID      
                       and ipdx52.DOS_FROM = c.DOS_FROM
                       and  ipdx52.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx52.cpt = c.cpt
                        and  ipdx52.line = 52 
     left join humana_ip_dx_query ipdx53 on ipdx53.Encounter_ID = c.Encounter_ID      
                       and ipdx53.DOS_FROM = c.DOS_FROM
                       and  ipdx53.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx53.cpt = c.cpt
                        and  ipdx53.line = 53 
    left join humana_ip_dx_query ipdx54 on ipdx54.Encounter_ID = c.Encounter_ID      
                       and ipdx54.DOS_FROM = c.DOS_FROM
                       and  ipdx54.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx54.cpt = c.cpt
                        and  ipdx54.line = 54 
    left join humana_ip_dx_query ipdx55 on ipdx55.Encounter_ID = c.Encounter_ID      
                       and ipdx55.DOS_FROM = c.DOS_FROM
                       and  ipdx55.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx55.cpt = c.cpt
                        and  ipdx55.line = 55 
    left join humana_ip_dx_query ipdx56 on ipdx56.Encounter_ID = c.Encounter_ID      
                       and ipdx56.DOS_FROM = c.DOS_FROM
                       and  ipdx56.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx56.cpt = c.cpt
                        and  ipdx56.line = 56 
   left join humana_ip_dx_query ipdx57 on ipdx57.Encounter_ID = c.Encounter_ID      
                       and ipdx57.DOS_FROM = c.DOS_FROM
                       and  ipdx57.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx57.cpt = c.cpt
                        and  ipdx57.line = 57 
    left join humana_ip_dx_query ipdx58 on ipdx58.Encounter_ID = c.Encounter_ID      
                       and ipdx58.DOS_FROM = c.DOS_FROM
                       and  ipdx58.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx58.cpt = c.cpt
                        and  ipdx58.line = 58 
    left join humana_ip_dx_query ipdx59 on ipdx59.Encounter_ID = c.Encounter_ID      
                       and ipdx59.DOS_FROM = c.DOS_FROM
                       and  ipdx59.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx59.cpt = c.cpt
                        and  ipdx59.line = 59 
    left join humana_ip_dx_query ipdx60 on ipdx60.Encounter_ID = c.Encounter_ID      
                       and ipdx60.DOS_FROM = c.DOS_FROM
                       and  ipdx60.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx60.cpt = c.cpt
                        and  ipdx60.line = 60 
left join humana_ip_dx_query ipdx61 on ipdx61.Encounter_ID = c.Encounter_ID      
                       and ipdx61.DOS_FROM = c.DOS_FROM
                       and  ipdx61.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx61.cpt = c.cpt
                        and  ipdx61.line = 61 
left join humana_ip_dx_query ipdx62 on ipdx62.Encounter_ID = c.Encounter_ID      
                       and ipdx62.DOS_FROM = c.DOS_FROM
                       and  ipdx62.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx62.cpt = c.cpt
                        and  ipdx62.line = 62 
left join humana_ip_dx_query ipdx63 on ipdx63.Encounter_ID = c.Encounter_ID      
                       and ipdx63.DOS_FROM = c.DOS_FROM
                       and  ipdx63.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx63.cpt = c.cpt
                        and  ipdx63.line = 63 
left join humana_ip_dx_query ipdx64 on ipdx64.Encounter_ID = c.Encounter_ID      
                       and ipdx64.DOS_FROM = c.DOS_FROM
                       and  ipdx64.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx64.cpt = c.cpt
                        and  ipdx64.line = 64 
left join humana_ip_dx_query ipdx65 on ipdx65.Encounter_ID = c.Encounter_ID      
                       and ipdx65.DOS_FROM = c.DOS_FROM
                       and  ipdx65.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx65.cpt = c.cpt
                        and  ipdx65.line = 65 
left join humana_ip_dx_query ipdx66 on ipdx66.Encounter_ID = c.Encounter_ID      
                       and ipdx66.DOS_FROM = c.DOS_FROM
                       and  ipdx66.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx66.cpt = c.cpt
                       and  ipdx66.line = 66 
   left join humana_ip_dx_query ipdx67 on ipdx67.Encounter_ID = c.Encounter_ID      
                       and ipdx67.DOS_FROM = c.DOS_FROM
                       and  ipdx67.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx67.cpt = c.cpt
                        and  ipdx67.line = 67   
   left join humana_ip_dx_query ipdx68 on ipdx68.Encounter_ID = c.Encounter_ID      
                       and ipdx68.DOS_FROM = c.DOS_FROM
                       and  ipdx68.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx68.cpt = c.cpt
                        and  ipdx68.line = 68   
   left join humana_ip_dx_query ipdx69 on ipdx69.Encounter_ID = c.Encounter_ID      
                       and ipdx69.DOS_FROM = c.DOS_FROM
                       and  ipdx69.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx69.cpt = c.cpt
                        and  ipdx69.line = 69   
   left join humana_ip_dx_query ipdx70 on ipdx70.Encounter_ID = c.Encounter_ID      
                       and ipdx70.DOS_FROM = c.DOS_FROM
                       and  ipdx70.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx70.cpt = c.cpt
                        and  ipdx70.line = 70   
   left join humana_ip_dx_query ipdx71 on ipdx71.Encounter_ID = c.Encounter_ID      
                       and ipdx71.DOS_FROM = c.DOS_FROM
                       and  ipdx71.DOS_THROUGH= c.DOS_THROUGH 
                      -- and   ipdx71.cpt = c.cpt
                       and  ipdx71.line = 71   
     left join humana_ip_dx_query ipdx72 on ipdx72.Encounter_ID = c.Encounter_ID      
                       and ipdx72.DOS_FROM = c.DOS_FROM
                       and  ipdx72.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx72.cpt = c.cpt
                        and  ipdx72.line = 72       
_________________________________________________________________________________________________________________________________________________________

---humana next 24 lines of DX codes 73-96

with cohert as(

select distinct 
ipdx.Encounter_ID Encounter_ID,
MEMBER_FIRST_NAME,
MEMBER_LAST_NAME,
UMID,
MEMBER_DATE_OF_BIRTH,
BILLING_PROVIDER_TAX_ID_NUMBER,
RENDERING_PROVIDER_NPI,
ipdx.DOS_FROM,
ipdx.DOS_THROUGH
 from
 humana_ip_dx_query ipdx
 join humana_main_query main on main.Encounter_ID = ipdx.Encounter_ID
 where 1=1
 and ipdx.line > 72
) 
select distinct 
c.Encounter_ID,
c.MEMBER_FIRST_NAME,
c.MEMBER_LAST_NAME,
c.UMID,
c.MEMBER_DATE_OF_BIRTH,
c.BILLING_PROVIDER_TAX_ID_NUMBER,
c.RENDERING_PROVIDER_NPI,
C.DOS_FROM,
C.DOS_THROUGH,
ipdx73.dx as dx_1,
ipdx74.dx as dx_2,
ipdx75.dx as dx_3,
ipdx76.dx as dx_4,
ipdx77.dx as dx_5,
ipdx78.dx as dx_6,
ipdx79.dx as dx_8,
ipdx80.dx as dx_9,
ipdx81.dx as dx_10,
ipdx82.dx as dx_11,
ipdx83.dx as dx_12,
ipdx84.dx as dx_13,
ipdx85.dx as dx_14,
ipdx86.dx as dx_15,
ipdx87.dx as dx_16,
ipdx88.dx as dx_17,
ipdx89.dx as dx_18,
ipdx90.dx as dx_19,
ipdx91.dx as dx_20,
ipdx92.dx as dx_21,
ipdx93.dx as dx_22,
ipdx94.dx as dx_23,
ipdx96.dx as dx_24
from cohert c
   left join humana_ip_dx_query ipdx73 on ipdx73.Encounter_ID = c.Encounter_ID      
                       and ipdx73.DOS_FROM = c.DOS_FROM
                       and  ipdx73.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx73.cpt = c.cpt
                        and  ipdx73.line = 73   
   left join humana_ip_dx_query ipdx74 on ipdx74.Encounter_ID = c.Encounter_ID      
                       and ipdx74.DOS_FROM = c.DOS_FROM
                       and  ipdx74.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx74.cpt = c.cpt
                        and  ipdx74.line = 74   
   left join humana_ip_dx_query ipdx75 on ipdx75.Encounter_ID = c.Encounter_ID      
                       and ipdx75.DOS_FROM = c.DOS_FROM
                       and  ipdx75.DOS_THROUGH= c.DOS_THROUGH 
                      -- and   ipdx75.cpt = c.cpt
                        and  ipdx75.line = 75  
 left join humana_ip_dx_query ipdx76 on ipdx76.Encounter_ID = c.Encounter_ID      
                       and ipdx76.DOS_FROM = c.DOS_FROM
                       and  ipdx76.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx76.cpt = c.cpt
                        and  ipdx76.line = 76   
 left join humana_ip_dx_query ipdx77 on ipdx77.Encounter_ID = c.Encounter_ID      
                       and ipdx77.DOS_FROM = c.DOS_FROM
                       and  ipdx77.DOS_THROUGH= c.DOS_THROUGH 
                      -- and   ipdx77.cpt = c.cpt
                        and  ipdx77.line = 77   
 left join humana_ip_dx_query ipdx78 on ipdx78.Encounter_ID = c.Encounter_ID      
                       and ipdx78.DOS_FROM = c.DOS_FROM
                       and  ipdx78.DOS_THROUGH= c.DOS_THROUGH 
                      -- and   ipdx78.cpt = c.cpt
                        and  ipdx78.line = 78   
 left join humana_ip_dx_query ipdx79 on ipdx79.Encounter_ID = c.Encounter_ID      
                       and ipdx79.DOS_FROM = c.DOS_FROM
                       and  ipdx79.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx79.cpt = c.cpt
                        and  ipdx79.line = 79   
 left join humana_ip_dx_query ipdx80 on ipdx80.Encounter_ID = c.Encounter_ID      
                       and ipdx80.DOS_FROM = c.DOS_FROM
                       and  ipdx80.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx80.cpt = c.cpt
                        and  ipdx80.line = 80 
 left join humana_ip_dx_query ipdx81 on ipdx81.Encounter_ID = c.Encounter_ID      
                       and ipdx81.DOS_FROM = c.DOS_FROM
                       and  ipdx81.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx81.cpt = c.cpt
                        and  ipdx81.line = 81 
 left join humana_ip_dx_query ipdx82 on ipdx82.Encounter_ID = c.Encounter_ID      
                       and ipdx82.DOS_FROM = c.DOS_FROM
                       and  ipdx82.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx82.cpt = c.cpt
                        and  ipdx82.line = 82 
 left join humana_ip_dx_query ipdx83 on ipdx83.Encounter_ID = c.Encounter_ID      
                       and ipdx83.DOS_FROM = c.DOS_FROM
                       and  ipdx83.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx83.cpt = c.cpt
                        and  ipdx83.line = 83 
  left join humana_ip_dx_query ipdx84 on ipdx84.Encounter_ID = c.Encounter_ID      
                       and ipdx84.DOS_FROM = c.DOS_FROM
                       and  ipdx84.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx84.cpt = c.cpt
                        and  ipdx84.line = 84 
 left join humana_ip_dx_query ipdx85 on ipdx85.Encounter_ID = c.Encounter_ID      
                       and ipdx85.DOS_FROM = c.DOS_FROM
                       and  ipdx85.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx85.cpt = c.cpt
                        and  ipdx85.line = 85 
 left join humana_ip_dx_query ipdx86 on ipdx86.Encounter_ID = c.Encounter_ID      
                       and ipdx86.DOS_FROM = c.DOS_FROM
                       and  ipdx86.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx86.cpt = c.cpt
                        and  ipdx86.line = 86 
  left join humana_ip_dx_query ipdx87 on ipdx87.Encounter_ID = c.Encounter_ID      
                       and ipdx87.DOS_FROM = c.DOS_FROM
                       and  ipdx87.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx87.cpt = c.cpt
                        and  ipdx87.line = 87 
  left join humana_ip_dx_query ipdx88 on ipdx88.Encounter_ID = c.Encounter_ID      
                       and ipdx88.DOS_FROM = c.DOS_FROM
                       and  ipdx88.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx88.cpt = c.cpt
                        and  ipdx88.line = 88 
left join humana_ip_dx_query ipdx89 on ipdx89.Encounter_ID = c.Encounter_ID      
                       and ipdx89.DOS_FROM = c.DOS_FROM
                       and  ipdx89.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx89.cpt = c.cpt
                        and  ipdx89.line = 89 
left join humana_ip_dx_query ipdx90 on ipdx90.Encounter_ID = c.Encounter_ID      
                       and ipdx90.DOS_FROM = c.DOS_FROM
                       and  ipdx90.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx90.cpt = c.cpt
                        and  ipdx90.line = 90 
left join humana_ip_dx_query ipdx91 on ipdx91.Encounter_ID = c.Encounter_ID      
                       and ipdx91.DOS_FROM = c.DOS_FROM
                       and  ipdx91.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx91.cpt = c.cpt
                        and  ipdx91.line = 91 
left join humana_ip_dx_query ipdx92 on ipdx92.Encounter_ID = c.Encounter_ID      
                       and ipdx92.DOS_FROM = c.DOS_FROM
                       and  ipdx92.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx92.cpt = c.cpt
                        and  ipdx92.line = 92 
left join humana_ip_dx_query ipdx93 on ipdx93.Encounter_ID = c.Encounter_ID      
                       and ipdx93.DOS_FROM = c.DOS_FROM
                       and  ipdx93.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx93.cpt = c.cpt
                        and  ipdx93.line = 93 
left join humana_ip_dx_query ipdx94 on ipdx94.Encounter_ID = c.Encounter_ID      
                       and ipdx94.DOS_FROM = c.DOS_FROM
                       and  ipdx94.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx94.cpt = c.cpt
                        and  ipdx94.line = 94 
left join humana_ip_dx_query ipdx95 on ipdx95.Encounter_ID = c.Encounter_ID      
                       and ipdx95.DOS_FROM = c.DOS_FROM
                       and  ipdx95.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx95.cpt = c.cpt
                        and  ipdx95.line = 95 
left join humana_ip_dx_query ipdx96 on ipdx96.Encounter_ID = c.Encounter_ID      
                       and ipdx96.DOS_FROM = c.DOS_FROM
                       and  ipdx96.DOS_THROUGH= c.DOS_THROUGH 
                       --and   ipdx96.cpt = c.cpt
                        and  ipdx96.line = 96 
