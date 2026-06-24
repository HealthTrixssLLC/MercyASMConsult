
--drop table bcbsok_main_query;


create table bcbsok_main_query as
select distinct
ha.hsp_account_Id  Encounter_ID,
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
--'MER'||cvr.record_id||to_char(sysdate,'MMDDYYYY') as claim_id_a,
'MER'||cvr.record_id as claim_id_a,
cast(null as number) CMS_ICN,
cast(null as number) ChartReviewReferenceId,
cast(null as number)FrequencyCode, 
cv.bil_prov_taxonomy   ProviderTaxonomyCode,
upper(regexp_replace(regexp_replace(cvg.medicare_subscr_id,'[- ]',''), '^(([0-9]{9}[a-z][0-9a-z]?)$|([a-z]{1,3}[0-9]{6})$|([a-z]{1,3}
 [0-9]{9})$|([0-9][a-z][0-9a-z][0-9][a-z][0-9a-z][0-9][a-z]{2}[0-9]{2}$)|.*)','\2\3\4\5',1,0,'i')) HICN,
to_char(pat.birth_date,'YYYYMMDD') as DOB,
to_char(ha.adm_date_time,'YYYYMMDD')  AS DOS_FROM,
to_char(ha.disch_date_time,'YYYYMMDD')  AS DOS_Through,
case when ha.acct_basecls_ha_c = 1 then '11' else '13' 
end as bill_type ,
cv.bil_prov_npi as BillingProviderNPI,
cv.bil_prov_taxid BillingProviderTaxId,
refser.prov_name,
refser.prov_addr_1 ,
refser.prov_city_name,
refser.prov_state_name,
refser.prov_zip_cd,
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
cast(null as number) ProcedureCode,
cast(null as number) patienttype,
sli.ln_rev_cd Revenue_Code,
cv2.admsn_typ admittype,
cv2.admsn_src admitsource,
cv2.dischrg_disp patientstatus,
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
cast(null as number)diag_type12,
cast(null as number)diag_type13,
cast(null as number)diag_type14,
cast(null as number)diag_type15,
cast(null as number)diag_type16,
cast(null as number)diag_type17,
cast(null as number)diag_type18,
cast(null as number)diag_type19,
cast(null as number)diag_type20,
cast(null as number)diag_type21,
cast(null as number)diag_type22,
cast(null as number)diag_type23,
cast(null as number)diag_type24,
cast(null as number)diag_type25
from clarity.clm_value_record cvr
join clarity.clm_values cv on cvr.record_id = cv.record_id
join clarity.svc_ln_info sli on cvr.record_id = sli.record_id
JOIN HSP_CLAIM_DETAIL2 HCD ON CVR.RECORD_ID = HCD.CLM_EXT_VAL_ID 
 JOIN COVERAGE CVG ON HCD.SG_CVG_ID = CVG.coverage_id
 JOIN clarity.clarity_epp epp on cvg.plan_id = epp.benefit_plan_id
join patient pat on HCD.sg_pat_ID = pat.pat_id
left join zc_state st on st.state_c = pat.state_c
inner join hsp_bucket bkt on hcd.hlb_id=bkt.bucket_id
inner join hsp_account ha on bkt.hsp_account_id = ha.hsp_account_id
--JOIN clarity.clarity_epp epp on cvg.plan_id = epp.benefit_plan_id
JOIN clarity.clarity_loc loc on HCD.SG_loc_id = LOC.LOC_ID
Join clarity.clarity_POS pos on loc.loc_id = pos.pos_id
left join zc_state zs on pos.state_c = zs.state_c
join clarity.clm_values_2 cv2 on cvr.record_id = cv2.record_id
left join bi_clarity.mv_ref_ser refser on  ha.attending_prov_id = refser.prov_id
--left join clarity_ser ser on refser.prov_id = ser.prov_id
where 1=1
 and cvr.clm_typ_c = 2 ---- Institutional Claim 
--and sli.line = 1
and bkt.bkt_sts_ha_c != 8  --rejected
and ha.adm_date_time >= '01-JAN-25'
and ha.disch_date_time < '01-JAN-26'
and substr( cvg.SUBSCR_NUM, 1,3) <> 'HRF'
and HCD.SG_loc_id in (50001, -- PARENT MERCY HOSPITAL HEALDTON
50003, -- PARENT MERCY HOSPITAL OKLAHOMA CITY
50004, -- PARENT MERCY HOSPITAL ARDMORE
50005, -- PARENT MERCY HOSPITAL TISHOMINGO
50006, -- PARENT MERCY HOSPITAL WATONGA
50007, -- PARENT MERCY HOSPITAL ADA
50009, -- PARENT MERCY HOSPITAL LOGAN COUNTY
50011) -- PARENT MERCY HOSPITAL KINGFISHER
and HCD.SG_plan_id in (2004702, ---- BCBS MEDICARE HMO 
2004703, ---- BCBS MEDICARE PFFS 
2004704, ---- BCBS HEALTH ADV MEDIPAK ADV HMO H9699 MCR 
32004702, ---- BCBS MEDICARE HMO CONTRACTED 
32004703, ---- BCBS MEDICARE PFFS CONTRACTED 
32004704 ---- BCBS HEALTH ADV MEDIPAK ADV HMO H9699 MCR CONTRACTED 
)

  and (cv.bill_typ_fac_cd in (11, 12, 18) or
(cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85) 
       )
       )
and substr( cvg.SUBSCR_NUM, 1,3) not in ('MMT','JKW','PBH','MBL','PMV','XPS','VOH','XRT','XYY','XYL','RKN',
           'UZS','XLU','YGZ','ZVR','YUA','ZXD','XJF','XYK','XZL','WZD','VOJ','L5I','VGD','Y3L','VOE','XXU',
           'YUP','YVK','HRF','5MK','MMA','JWO','JKW','MBG','MCM','HRT','XEE','VOK','X3L','L5B','VNC','VOK','VYM',
           'WZV','XCX','XJP','XJI','Y2M','YJX','ZMX','YWW')
and sli.line = 1   ------- rev code not needed
and (sli.ln_proc_cd in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2025)----lareed4.sweeps_cpt_hcpcs_list_2022)
     or sli.ln_proc_cd is null)
_________________________________________________________________________________________________________________________
--DX Code query grabs all the DX codes from the bcbsok_main_query

--drop table bcbsok_IP_DX_query;

create table bcbsok_IP_DX_query as
select distinct
main.Encounter_ID,
main.DOS_FROM,
main.DOS_Through,
replace(edg.ref_bill_code,'.','')as dx,
hadx.line
from  bcbsok_main_query main 
join hsp_acct_dx_list hadx on main.Encounter_ID = hadx.hsp_account_id
 join clarity_edg edg on hadx.dx_id = edg.dx_id
 where 1=1
 order by hadx.line
______________________________________________________________________________________________________________________________________________________________________________________________________________________________


---Final ouput has the DX codes in the correct format up to 1-25 dx codes.



with cohert as(

select distinct 
opdx.Encounter_ID,
recordid ,
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
bill_type,
BillingProviderNPI,
BillingProviderTaxId,
prov_name,
prov_addr_1,
prov_city_name,
prov_state_name,
prov_zip_cd,
Member_ID,
pat_last_name,
pat_first_name,
Member_Street_Address_1,
Member_City,
Member_State_Code,
Member_Zip_Code,
GENDER,
ProductOrServiceQualifier,
ProcedureCode,
patienttype,
Revenue_Code,
admittype,
admitsource,
patientstatus,
DGS,
diag_type01,
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
diag_type12,
diag_type13,
diag_type14,
diag_type15,
diag_type16,
diag_type17,
diag_type18,
diag_type19,
diag_type20,
diag_type21,
diag_type22,
diag_type23,
diag_type24,
diag_type25
 from
 bcbsok_IP_DX_query opdx
 join bcbsok_main_query main on main.Encounter_ID = opdx.Encounter_ID

 where 1=1
) 
select distinct 
c.Encounter_ID,
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
c.bill_type,
c.BillingProviderNPI,
c.BillingProviderTaxId,
c.prov_name,
c.prov_addr_1,
c.prov_city_name,
c.prov_state_name,
c.prov_zip_cd,
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
c.patienttype,
c.Revenue_Code,
c.admittype,
c.admitsource,
c.patientstatus,
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
opdx12.dx as dx_12,
case when opdx13.dx is not null and c.diag_type13 IS null
then'10'
else null
end diag_type13,
opdx13.dx as dx_13,
case when opdx14.dx is not null and c.diag_type14 IS null
then'10'
else null
end diag_type14,
opdx14.dx as dx_14,
case when opdx15.dx is not null and c.diag_type15 IS null
then'10'
else null
end diag_type15,
opdx15.dx as dx_15,
case when opdx16.dx is not null and c.diag_type16 IS null
then'10'
else null
end diag_type16,
opdx16.dx as dx_16,
case when opdx17.dx is not null and c.diag_type17 IS null
then'10'
else null
end diag_type17,
opdx17.dx as dx_17,
case when opdx18.dx is not null and c.diag_type18 IS null
then'10'
else null
end diag_type18,
opdx18.dx as dx_18,
case when opdx19.dx is not null and c.diag_type19 IS null
then'10'
else null
end diag_type19,
opdx19.dx as dx_19,
case when opdx20.dx is not null and c.diag_type20 IS null
then'10'
else null
end diag_type20,
opdx20.dx as dx_20,
case when opdx21.dx is not null and c.diag_type21 IS null
then'10'
else null
end diag_type21,
opdx21.dx as dx_21,
case when opdx22.dx is not null and c.diag_type22 IS null
then'10'
else null
end diag_type22,
opdx22.dx as dx_22,
case when opdx23.dx is not null and c.diag_type23 IS null
then'10'
else null
end diag_type23,
opdx23.dx as dx_23,
case when opdx24.dx is not null and c.diag_type24 IS null
then'10'
else null
end diag_type24,
opdx24.dx as dx_24,
case when opdx25.dx is not null and c.diag_type25 IS null
then'10'
else null
end diag_type25,
opdx25.dx as dx_25
from cohert c
  left join  bcbsok_IP_DX_query opdx1 on opdx1.encounter_id = c.encounter_id      
                       and opdx1.DOS_FROM = c.DOS_FROM
                       and  opdx1.DOS_Through = c.DOS_Through  
                      -- and   opdx1.cpt_code = c.cpt_code
                        and  opdx1.line = 1                   
   left join  bcbsok_IP_DX_query opdx2 on opdx2.encounter_id = c.encounter_id      
                       and opdx2.DOS_FROM = c.DOS_FROM
                       and  opdx2.DOS_Through = c.DOS_Through  
                      -- and   opdx2.cpt_code = c.cpt_code
                        and  opdx2.line = 2                                     
   left join  bcbsok_IP_DX_query opdx3 on opdx3.encounter_id = c.encounter_id      
                       and opdx3.DOS_FROM = c.DOS_FROM
                       and  opdx3.DOS_Through = c.DOS_Through  
                       --and   opdx3.cpt_code = c.cpt_code
                        and  opdx3.line = 3   
    left join  bcbsok_IP_DX_query opdx4 on opdx4.encounter_id = c.encounter_id      
                       and opdx4.DOS_FROM = c.DOS_FROM
                       and  opdx4.DOS_Through = c.DOS_Through  
                       --and   opdx4.cpt_code = c.cpt_code
                        and  opdx4.line = 4   
   left join  bcbsok_IP_DX_query opdx5 on opdx5.encounter_id = c.encounter_id      
                       and opdx5.DOS_FROM = c.DOS_FROM
                       and  opdx5.DOS_Through = c.DOS_Through  
                       --and   opdx5.cpt_code = c.cpt_code
                        and  opdx5.line = 5   
   left join  bcbsok_IP_DX_query opdx6 on opdx6.encounter_id = c.encounter_id      
                       and opdx6.DOS_FROM = c.DOS_FROM
                       and  opdx6.DOS_Through = c.DOS_Through  
                       --and   opdx6.cpt_code = c.cpt_code
                        and  opdx6.line = 6   
   left join  bcbsok_IP_DX_query opdx7 on opdx7.encounter_id = c.encounter_id      
                       and opdx7.DOS_FROM = c.DOS_FROM
                       and  opdx7.DOS_Through = c.DOS_Through  
                       --and   opdx7.cpt_code = c.cpt_code
                        and  opdx7.line = 7   
   left join  bcbsok_IP_DX_query opdx8 on opdx8.encounter_id = c.encounter_id      
                       and opdx8.DOS_FROM = c.DOS_FROM
                       and  opdx8.DOS_Through = c.DOS_Through  
                       --and   opdx8.cpt_code = c.cpt_code
                        and  opdx8.line = 8   
   left join  bcbsok_IP_DX_query opdx9 on opdx9.encounter_id = c.encounter_id      
                       and opdx9.DOS_FROM = c.DOS_FROM
                       and  opdx9.DOS_Through = c.DOS_Through  
                       --and   opdx9.cpt_code = c.cpt_code
                        and  opdx9.line = 9   
   left join  bcbsok_IP_DX_query opdx10 on opdx10.encounter_id = c.encounter_id      
                       and opdx10.DOS_FROM = c.DOS_FROM
                       and  opdx10.DOS_Through = c.DOS_Through  
                      -- and   opdx10.cpt_code = c.cpt_code
                        and  opdx10.line = 10   
   left join  bcbsok_IP_DX_query opdx11 on opdx11.encounter_id = c.encounter_id      
                       and opdx11.DOS_FROM = c.DOS_FROM
                       and  opdx11.DOS_Through = c.DOS_Through  
                      -- and   opdx11.cpt_code = c.cpt_code
                        and  opdx11.line = 11   
    left join  bcbsok_IP_DX_query opdx12 on opdx12.encounter_id = c.encounter_id      
                       and opdx12.DOS_FROM = c.DOS_FROM
                       and  opdx12.DOS_Through = c.DOS_Through  
                       --and   opdx12.cpt_code = c.cpt_code
                        and  opdx12.line = 12   
 left join  bcbsok_IP_DX_query opdx13 on opdx13.encounter_id = c.encounter_id      
                       and opdx13.DOS_FROM = c.DOS_FROM
                       and  opdx13.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx13.line = 13 
 left join  bcbsok_IP_DX_query opdx14 on opdx14.encounter_id = c.encounter_id      
                       and opdx14.DOS_FROM = c.DOS_FROM
                       and  opdx14.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx14.line = 14   
 left join  bcbsok_IP_DX_query opdx15 on opdx15.encounter_id = c.encounter_id      
                       and opdx15.DOS_FROM = c.DOS_FROM
                       and  opdx15.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx15.line = 15   
 left join  bcbsok_IP_DX_query opdx16 on opdx16.encounter_id = c.encounter_id      
                       and opdx16.DOS_FROM = c.DOS_FROM
                       and  opdx16.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx16.line = 16
 left join  bcbsok_IP_DX_query opdx17 on opdx17.encounter_id = c.encounter_id      
                       and opdx17.DOS_FROM = c.DOS_FROM
                       and  opdx17.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx17.line = 17  
 left join  bcbsok_IP_DX_query opdx18 on opdx18.encounter_id = c.encounter_id      
                       and opdx18.DOS_FROM = c.DOS_FROM
                       and  opdx18.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx18.line = 18 
 left join  bcbsok_IP_DX_query opdx18 on opdx18.encounter_id = c.encounter_id      
                       and opdx18.DOS_FROM = c.DOS_FROM
                       and  opdx18.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx18.line = 18 
 left join  bcbsok_IP_DX_query opdx19 on opdx19.encounter_id = c.encounter_id      
                       and opdx19.DOS_FROM = c.DOS_FROM
                       and  opdx19.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx19.line = 19 
left join  bcbsok_IP_DX_query opdx20 on opdx20.encounter_id = c.encounter_id      
                       and opdx20.DOS_FROM = c.DOS_FROM
                       and  opdx20.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx20.line = 20 
left join  bcbsok_IP_DX_query opdx21 on opdx21.encounter_id = c.encounter_id      
                       and opdx21.DOS_FROM = c.DOS_FROM
                       and  opdx21.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx21.line = 21 
left join  bcbsok_IP_DX_query opdx22 on opdx22.encounter_id = c.encounter_id      
                       and opdx22.DOS_FROM = c.DOS_FROM
                       and  opdx22.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx22.line = 22 
left join  bcbsok_IP_DX_query opdx23 on opdx23.encounter_id = c.encounter_id      
                       and opdx23.DOS_FROM = c.DOS_FROM
                       and  opdx23.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx23.line = 23 
left join  bcbsok_IP_DX_query opdx24 on opdx24.encounter_id = c.encounter_id      
                       and opdx24.DOS_FROM = c.DOS_FROM
                       and  opdx24.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx24.line = 24 
left join  bcbsok_IP_DX_query opdx25 on opdx25.encounter_id = c.encounter_id      
                       and opdx25.DOS_FROM = c.DOS_FROM
                       and  opdx25.DOS_Through = c.DOS_Through  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx25.line = 25


______________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 26-50 dx codes.


with cohert as(

select distinct 
opdx.Encounter_ID,
recordid ,
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
bill_type,
BillingProviderNPI,
BillingProviderTaxId,
prov_name,
prov_addr_1,
prov_city_name,
prov_state_name,
prov_zip_cd,
Member_ID,
pat_last_name,
pat_first_name,
Member_Street_Address_1,
Member_City,
Member_State_Code,
Member_Zip_Code,
GENDER,
ProductOrServiceQualifier,
ProcedureCode,
patienttype,
Revenue_Code,
admittype,
admitsource,
patientstatus,
DGS,
diag_type01,
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
diag_type12,
diag_type13,
diag_type14,
diag_type15,
diag_type16,
diag_type17,
diag_type18,
diag_type19,
diag_type20,
diag_type21,
diag_type22,
diag_type23,
diag_type24,
diag_type25
 from
 bcbsok_IP_DX_query opdx
 join bcbsok_main_query main on main.Encounter_ID = opdx.Encounter_ID
 where 1=1
 and opdx.line > 25
) 
select distinct 
c.Encounter_ID,
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
c.bill_type,
c.BillingProviderNPI,
c.BillingProviderTaxId,
c.prov_name,
c.prov_addr_1,
c.prov_city_name,
c.prov_state_name,
c.prov_zip_cd,
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
c.patienttype,
c.Revenue_Code,
c.admittype,
c.admitsource,
c.patientstatus,
c.DGS,
c.diag_type01,
opdx26.dx as dx_1,
case when opdx27.dx is not null and c.diag_type02 IS null
then'10'
else null
end diag_type02,
opdx27.dx as dx_2,
case when opdx28.dx is not null and c.diag_type03 IS null
then'10'
else null
end diag_type03,
opdx28.dx as dx_3,
case when opdx29.dx is not null and c.diag_type04 IS null
then'10'
else null
end diag_type04,
opdx29.dx as dx_4,
case when opdx30.dx is not null and c.diag_type05 IS null
then'10'
else null
end diag_type05,
opdx30.dx as dx_5,
case when opdx31.dx is not null and c.diag_type06 IS null
then'10'
else null
end diag_type06,
opdx31.dx as dx_6,
case when opdx32.dx is not null and c.diag_type07 IS null
then'10'
else null
end diag_type07,
opdx32.dx as dx_7,
case when opdx33.dx is not null and c.diag_type08 IS null
then'10'
else null
end diag_type08,
opdx33.dx as dx_8,
case when opdx34.dx is not null and c.diag_type09 IS null
then'10'
else null
end diag_type09,
opdx34.dx as dx_9,
case when opdx35.dx is not null and c.diag_type10 IS null
then'10'
else null
end diag_type10,
opdx35.dx as dx_10,
case when opdx36.dx is not null and c.diag_type11 IS null
then'10'
else null
end diag_type11,
opdx36.dx as dx_11,
case when opdx37.dx is not null and c.diag_type12 IS null
then'10'
else null
end diag_type12,
opdx37.dx as dx_12,
case when opdx38.dx is not null and c.diag_type13 IS null
then'10'
else null
end diag_type03,
opdx38.dx as dx_13,
case when opdx39.dx is not null and c.diag_type14 IS null
then'10'
else null
end diag_type14,
opdx39.dx as dx_14,
case when opdx40.dx is not null and c.diag_type15 IS null
then'10'
else null
end diag_type05,
opdx40.dx as dx_15,
case when opdx41.dx is not null and c.diag_type16 IS null
then'10'
else null
end diag_type16,
opdx41.dx as dx_16,
case when opdx42.dx is not null and c.diag_type17 IS null
then'10'
else null
end diag_type17,
opdx42.dx as dx_17,
case when opdx43.dx is not null and c.diag_type18 IS null
then'10'
else null
end diag_type18,
opdx43.dx as dx_18,
case when opdx44.dx is not null and c.diag_type19 IS null
then'10'
else null
end diag_type19,
opdx44.dx as dx_19,
case when opdx45.dx is not null and c.diag_type20 IS null
then'10'
else null
end diag_type20,
opdx45.dx as dx_20,
case when opdx46.dx is not null and c.diag_type21 IS null
then'10'
else null
end diag_type21,
opdx46.dx as dx_21,
case when opdx47.dx is not null and c.diag_type22 IS null
then'10'
else null
end diag_type22,
opdx47.dx as dx_22,
case when opdx48.dx is not null and c.diag_type23 IS null
then'10'
else null
end diag_type23,
opdx48.dx as dx_23,
case when opdx49.dx is not null and c.diag_type24 IS null
then'10'
else null
end diag_type24,
opdx49.dx as dx_24,
case when opdx50.dx is not null and c.diag_type25 IS null
then'10'
else null
end diag_type25,
opdx50.dx as dx_25
from cohert c
     left join  bcbsok_IP_DX_query opdx26 on opdx26.encounter_id = c.encounter_id      
                       and opdx26.DOS_FROM = c.DOS_FROM
                       and  opdx26.DOS_Through = c.DOS_Through  
                       --and   opdx26.cpt_code = c.cpt_code
                        and  opdx26.line = 26 
   left join  bcbsok_IP_DX_query opdx27 on opdx27.encounter_id = c.encounter_id      
                       and opdx27.DOS_FROM = c.DOS_FROM
                       and  opdx27.DOS_Through = c.DOS_Through  
                       --and   opdx27.cpt_code = c.cpt_code
                        and  opdx27.line = 27   
   left join  bcbsok_IP_DX_query opdx28 on opdx28.encounter_id = c.encounter_id      
                       and opdx28.DOS_FROM = c.DOS_FROM
                       and  opdx28.DOS_Through = c.DOS_Through  
                       --and   opdx28.cpt_code = c.cpt_code
                        and  opdx28.line = 28   
   left join  bcbsok_IP_DX_query opdx29 on opdx29.encounter_id = c.encounter_id      
                       and opdx29.DOS_FROM = c.DOS_FROM
                       and  opdx29.DOS_Through = c.DOS_Through  
                       --and   opdx29.cpt_code = c.cpt_code
                        and  opdx29.line = 29   
   left join  bcbsok_IP_DX_query opdx30 on opdx30.encounter_id = c.encounter_id      
                       and opdx30.DOS_FROM = c.DOS_FROM
                       and  opdx30.DOS_Through = c.DOS_Through  
                       --and   opdx30.cpt_code = c.cpt_code
                        and  opdx30.line = 30   
   left join  bcbsok_IP_DX_query opdx31 on opdx31.encounter_id = c.encounter_id      
                       and opdx31.DOS_FROM = c.DOS_FROM
                       and  opdx31.DOS_Through = c.DOS_Through  
                       --and   opdx31.cpt_code = c.cpt_code
                        and  opdx31.line = 31   
   left join  bcbsok_IP_DX_query opdx32 on opdx32.encounter_id = c.encounter_id      
                       and opdx32.DOS_FROM = c.DOS_FROM
                       and  opdx32.DOS_Through = c.DOS_Through  
                       --and   opdx32.cpt_code = c.cpt_code
                        and  opdx32.line = 32   
   left join  bcbsok_IP_DX_query opdx33 on opdx33.encounter_id = c.encounter_id      
                       and opdx33.DOS_FROM = c.DOS_FROM
                       and  opdx33.DOS_Through = c.DOS_Through  
                       --and   opdx33.cpt_code = c.cpt_code
                        and  opdx33.line = 33   
   left join  bcbsok_IP_DX_query opdx34 on opdx34.encounter_id = c.encounter_id      
                       and opdx34.DOS_FROM = c.DOS_FROM
                       and  opdx34.DOS_Through = c.DOS_Through  
                       --and   opdx34.cpt_code = c.cpt_code
                        and  opdx34.line = 34   
   left join  bcbsok_IP_DX_query opdx35 on opdx35.encounter_id = c.encounter_id      
                       and opdx35.DOS_FROM = c.DOS_FROM
                       and  opdx35.DOS_Through = c.DOS_Through  
                       --and   opdx35.cpt_code = c.cpt_code
                        and  opdx35.line = 35  
 left join  bcbsok_IP_DX_query opdx36 on opdx36.encounter_id = c.encounter_id      
                       and opdx36.DOS_FROM = c.DOS_FROM
                       and  opdx36.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx36.line = 36   
 left join  bcbsok_IP_DX_query opdx37 on opdx37.encounter_id = c.encounter_id      
                       and opdx37.DOS_FROM = c.DOS_FROM
                       and  opdx37.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx37.line = 37
 left join  bcbsok_IP_DX_query opdx38 on opdx38.encounter_id = c.encounter_id      
                       and opdx38.DOS_FROM = c.DOS_FROM
                       and  opdx38.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx38.line = 38 
 left join  bcbsok_IP_DX_query opdx39 on opdx39.encounter_id = c.encounter_id      
                       and opdx39.DOS_FROM = c.DOS_FROM
                       and  opdx39.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx39.line = 39  
 left join  bcbsok_IP_DX_query opdx40 on opdx40.encounter_id = c.encounter_id      
                       and opdx40.DOS_FROM = c.DOS_FROM
                       and  opdx40.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx40.line = 40 
 left join  bcbsok_IP_DX_query opdx41 on opdx41.encounter_id = c.encounter_id      
                       and opdx41.DOS_FROM = c.DOS_FROM
                       and  opdx41.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx41.line = 41 
 left join  bcbsok_IP_DX_query opdx42 on opdx42.encounter_id = c.encounter_id      
                       and opdx42.DOS_FROM = c.DOS_FROM
                       and  opdx42.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx42.line = 42 
 left join  bcbsok_IP_DX_query opdx43 on opdx43.encounter_id = c.encounter_id      
                       and opdx43.DOS_FROM = c.DOS_FROM
                       and  opdx43.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx43.line = 43 
 left join  bcbsok_IP_DX_query opdx44 on opdx44.encounter_id = c.encounter_id      
                       and opdx44.DOS_FROM = c.DOS_FROM
                       and  opdx44.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx44.line = 44 
 left join  bcbsok_IP_DX_query opdx45 on opdx45.encounter_id = c.encounter_id      
                       and opdx45.DOS_FROM = c.DOS_FROM
                       and  opdx45.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx45.line = 45
 left join  bcbsok_IP_DX_query opdx46 on opdx46.encounter_id = c.encounter_id      
                       and opdx46.DOS_FROM = c.DOS_FROM
                       and  opdx46.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx46.line = 46
 left join  bcbsok_IP_DX_query opdx47 on opdx47.encounter_id = c.encounter_id      
                       and opdx47.DOS_FROM = c.DOS_FROM
                       and  opdx47.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx47.line = 47
 left join  bcbsok_IP_DX_query opdx48 on opdx48.encounter_id = c.encounter_id      
                       and opdx48.DOS_FROM = c.DOS_FROM
                       and  opdx48.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx48.line = 48
 left join  bcbsok_IP_DX_query opdx49 on opdx49.encounter_id = c.encounter_id      
                       and opdx49.DOS_FROM = c.DOS_FROM
                       and  opdx49.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx49.line = 49
 left join  bcbsok_IP_DX_query opdx50 on opdx50.encounter_id = c.encounter_id      
                       and opdx50.DOS_FROM = c.DOS_FROM
                       and  opdx50.DOS_Through = c.DOS_Through  
                       --and   opdx36.cpt_code = c.cpt_code
                        and  opdx50.line = 50



