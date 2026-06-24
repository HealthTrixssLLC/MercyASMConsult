
---drop table aetna_main_query;


create table aetna_main_query as
select distinct 
ha.hsp_account_Id  Encounter_ID,
sli.ln_rev_cd rev_code,
'D' as record_type,
--row_number()over (order by ha.hsp_account_id asc) record_id,
cast(null as number) record_id,
'I' as Claim_type_Indicator,
'CR' as Supplemental_type,
cast(null as number) as original_record_id,
cast(null as number) as system_source,
'1' as claim_Ind,
cast(null as number) as plan_claim_number,
cast(null as number) as original_plan_claim_id,
cast(null as number) as CMS_Contract_Number,
regexp_replace(cvg.medicare_subscr_id,'[- ]','')HICN,
CVG.SUBSCR_NUM as Member_ID,
pat.pat_last_name,
pat.pat_first_name,
cast(null as number) as middle_name,
cast(null as number) as member_name_suffix,
pat.add_line_1 as Member_Street_Address_1,
pat.add_line_2 as Member_Street_Address_2,
pat.city as Member_City,
st.abbr as Member_State_Code,
rpad(pat.zip,5) as Member_Zip_Code,
 cast(null as number) as member_zip4,
 cast(null as number) as Member_county_residence,
 cast(null as number) as Member_Country,
 cast(null as number) as Member_country_Subdivision,
 cast(null as number) as Member_Group_number,
to_char(pat.birth_date,'YYYYMMDD') Member_DOB,
case 
when pat.sex_c = 1 then 'F'
when pat.sex_c = 2 then 'M'
else pat.sex_c
end as GENDER,
 cast(null as number) as ssn,
 cast(null as number) as pcp_id,
 cast(null as number) as pcp_name_l,
 cast(null as number) as pcp_name_f,
cast(null as number) as Patient_account_num,
'INPT' as provider_type,
cast(null as number) as Sub_P_L_Name,
cast(null as number) as Sub_p_F_name,	
cast(null as number) as Sub_p_id,
cast(null as number) as Sub_P_Cred,
cast(null as number) as Rendering_P_Org,	
cast(null as number) as Rendering_P_Group,
cv2.att_prov_nam_last as rend_Prov_Last,
cv2.att_prov_nam_first as rend_prov_first,
cast(null as number) as rend_middle,
cast(null as number) as rend_suffix,
refser.prov_addr_1,
refser.prov_addr_2,
refser.prov_city_name,
refser.prov_state_name,
rpad(refser.prov_zip_cd,5) as prov_zip_cd,
cast(null as number) as prov_zip4,
cv2.att_prov_npi as Provider_NPI,
cv.bil_prov_taxid as provider_tax_id,
 cast(null as number) as Rendering_P_T_Code,
 cast(null as number) as Rendering_State_license,
  cast(null as number) as Rendering_Upin,
  cast(null as number) as Rendering_plan_Provider_ID,
  cast(null as number) as Rendering_Plan_Loc,
  cast(null as number) as Rendering_Plan_Last,
  cast(null as number) as Rendering_Plan_First,
  cast(null as number) as Rendering_Prov_Cred,
  cast(null as number) as Rendering_P_phone,
 cast(null as number) as Oversight_P_L,
  cast(null as number) as Oversight_P_N,
  cast(null as number) as Oversight_P_M,
  cast(null as number) as Oversight_S,
  cast(null as number) as Oversight_Add_1,
  cast(null as number) as Oversight_Add_2,
  cast(null as number) as Oversight_City,
  cast(null as number) as Oversight_State,
 cast(null as number) as Over_Provider_zip,
  cast(null as number) as Over_Provider_zip4,
  cast(null as number) as Over_P_Cred,
to_char(ha.adm_date_time,'YYYYMMDD') Date_of_Service_From,
to_char(ha.disch_date_time,'YYYYMMDD') Date_of_Service_Thru,
LOC.LOC_NAME as facility_name,
cast (null as number) POA1,
cast (null as number) POA2,
cast (null as number) POA3,
cast (null as number) POA4,
cast (null as number) POA5,
cast (null as number) POA6,
cast (null as number) POA7,
cast (null as number) POA8,
cast (null as number) POA9,
cast (null as number) POA10,
cast (null as number) POA11,
cast (null as number) POA12,
cast (null as number) POA13,
cast (null as number) POA14,
cast (null as number) POA15,
cast (null as number) POA16,
cast (null as number) POA17,
cast (null as number) POA18,
cast (null as number) POA19,
cast (null as number) POA20,
cast (null as number) POA21,
cast (null as number) POA22,
cast (null as number) POA23,
cast (null as number) POA24,
cast (null as number) POA25,
cast (null as number) POA26,
cast (null as number) POA27,
cast (null as number) POA28,
cast (null as number) POA29,
cast (null as number) POA30,
cast (null as number) diag1_qual,
cast (null as number) diag2_qual,
cast (null as number) diag3_qual,
cast (null as number) diag4_qual,
cast (null as number) diag5_qual,
cast (null as number) diag6_qual,
cast (null as number) diag7_qual,
cast (null as number) diag8_qual,
cast (null as number) diag9_qual,
cast (null as number) diag10_qual,
cast (null as number) diag11_qual,
cast (null as number) diag12_qual,
cast (null as number) diag13_qual,
cast (null as number) diag14_qual,
cast (null as number) diag15_qual,
cast (null as number) diag16_qual,
cast (null as number) diag17_qual,
cast (null as number) diag18_qual,
cast (null as number) diag19_qual,
cast (null as number) diag20_qual,
cast (null as number) diag21_qual,
cast (null as number) diag22_qual,
cast (null as number) diag23_qual,
cast (null as number) diag24_qual,
cast (null as number) diag25_qual,
cast (null as number) diag26_qual,
cast (null as number) diag27_qual,
cast (null as number) diag28_qual,
cast (null as number) diag29_qual,
cast (null as number) diag30_qual,
cast (null as number) ra1,
cast (null as number) ra2,
cast (null as number) ra3,
cast (null as number) ra4,
cast (null as number) ra5,
cast (null as number) ra6,
cast (null as number) ra7,
cast (null as number) ra8,
cast (null as number) ra9,
cast (null as number) ra10,
cast (null as number) ra11,
cast (null as number) ra12,
cast (null as number) ra13,
cast (null as number) ra14,
cast (null as number) ra15,
cast (null as number) ra16,
cast (null as number) ra17,
cast (null as number) ra18,
cast (null as number) ra19,
cast (null as number) ra20,
cast (null as number) ra21,
cast (null as number) ra22,
cast (null as number) ra23,
cast (null as number) ra24,
cast (null as number) ra25,
cast (null as number) ra26,
cast (null as number) ra27,
cast (null as number) ra28,
cast (null as number) ra29,
cast (null as number) ra30,
cast (null as number)del_diag1,
cast (null as number)del_diag2,
cast (null as number)del_diag3,
cast (null as number)del_diag4,
cast (null as number)del_diag5,
cast (null as number)del_diag6,
cast (null as number)del_diag7,
cast (null as number)del_diag8,
cast (null as number)del_diag9,
cast (null as number)del_diag10,
cast (null as number)del_diag11,
cast (null as number)del_diag12,
cast (null as number)del_diag13,
cast (null as number)del_diag14,
cast (null as number)del_diag15,
cast (null as number)del_diag16,
cast (null as number)del_diag17,
cast (null as number)del_diag18,
cast (null as number)del_diag19,
cast (null as number)del_diag20,
cast (null as number)del_diag21,
cast (null as number)del_diag22,
cast (null as number)del_diag23,
cast (null as number)del_diag24,
cast (null as number)del_diag25,
cast (null as number)del_diag26,
cast (null as number)del_diag27,
cast (null as number)del_diag28,
cast (null as number)del_diag29,
cast (null as number)del_diag30,
 cast(null as number) as option_ind_1,
 cast(null as number) as option_ind_2,
 cast(null as number) as option_ind_3,
 cast(null as number) as option_ind_4,
 cast(null as number) as option_ind_5,
 cast(null as number) as option_ind_6,
 cast(null as number) as option_ind_7,
 cast(null as number) as option_ind_8,
 cast(null as number) as option_ind_9,
 cast(null as number) as option_ind_10,
 '^' as End_of_Rec
from clarity.clm_value_record cvr
join clarity.clm_values cv on cvr.record_id = cv.record_id
join clarity.svc_ln_info sli on cvr.record_id = sli.record_id
JOIN HSP_CLAIM_DETAIL2 HCD ON CVR.RECORD_ID = HCD.CLM_EXT_VAL_ID 
 JOIN COVERAGE CVG ON HCD.SG_CVG_ID = CVG.coverage_id
join patient pat on HCD.sg_pat_ID = pat.pat_id
left join zc_state st on st.state_c = pat.state_c
inner join hsp_bucket bkt on hcd.hlb_id=bkt.bucket_id
inner join hsp_account ha on bkt.hsp_account_id = ha.hsp_account_id
JOIN clarity.clarity_loc loc on HCD.SG_loc_id = LOC.LOC_ID
join clarity.clm_values_2 cv2 on cvr.record_id = cv2.record_id
left join bi_clarity.mv_ref_ser refser on  ha.attending_prov_id = refser.prov_id 
where 1=1
and cvr.clm_typ_c = 2 ---- Institutional Claim 
--and sli.line = 1 
and bkt.bkt_sts_ha_c != 8  --rejected
and (cv.bill_typ_fac_cd in (11, 12, 18) or
(cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85) 
)
)  
and sli.line = 1
and (sli.ln_proc_cd in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2025)
and loc.loc_id in 
(50001, --	PARENT MERCY HOSPITAL HEALDTON   ---OK
50003, --	PARENT MERCY HOSPITAL OKLAHOMA CITY
50004, --	PARENT MERCY HOSPITAL ARDMORE
50005, --	PARENT MERCY HOSPITAL TISHOMINGO
50006, --	PARENT MERCY HOSPITAL WATONGA
50007, --	PARENT MERCY HOSPITAL ADA
50009, --	PARENT MERCY HOSPITAL LOGAN COUNTY
50011) --	PARENT MERCY HOSPITAL KINGFISHER
--and loc.loc_id in (20001, --    PARENT MERCY HOSPITAL ST LOUIS  ------------east
--20002, --    PARENT MERCY HOSPITAL WASHINGTON   
-- 20003, --     PARENT MERCY REHABILITATION HOSPITAL ST LOUIS
-- 20008, ---     PARENT MERCY REHABILITATION HOSPITAL SOUTH
--20004, --    PARENT MERCY HOSPITAL JEFFERSON   
--20006, --    PARENT MERCY HOSPITAL LINCOLN   
--20007,   --PARENT MERCY HOSPITAL SOUTH
--20010,  --PARENT MERCY HOSPITAL PERRY
--20012)  --PARENT MERCY HOSPITAL SOUTHEAST
--and loc.loc_id in (40006,    --    PARENT MERCY ST FRANCIS HOSPITAL  ------------------sgf
--40001,--    PARENT MERCY HOSPITAL SPRINGFIELD   
--40002,--    PARENT MERCY HOSPITAL LEBANON   
--40003,--    PARENT MERCY HOSPITAL AURORA   
--40004,--    PARENT MERCY HOSPITAL BERRYVILLE   
--40005, --    PARENT MERCY HOSPITAL CASSVILLE   
--90003,  --PARENT MERCY HOSPITAL CARTHAGE
--90001,   -- PARENT MERCY HOSPITAL JOPLIN
--90002, --PARENT MERCY HOSPITAL PITTSBURG
--90005,---- PARENT MERCY SPECIALTY HOSPITAL SOUTHEAST KANSAS
--90004)  --PARENT MERCY MAUDE NORTON HOSPITAL COLUMBUS
 --and loc.loc_id = (80001) ----------NWA 
--and loc.loc_id in( '70004', -------------------	PARENT MERCY HOSPITAL FORT SMITH 
--'70001', ---PARENT MERCY HOSPITAL WALDRON
---'70002', ---PARENT MERCY HOSPITAL PARIS
---'70003', ------PARENT MERCY HOSPITAL OZARK
---'70005')   ---PARENT MERCY HOSPITAL BOONEVILLE
and HCD.UB_THROUGH_DT >= '01-JAN-25'
and HCD.UB_THROUGH_DT < '01-Jan-26'
and HCD.SG_plan_id in (2001001, --	AETNA 26632 ADVANTRA OPTION 2 HMO MCR            
2001002	, --	AETNA H2663015 PRIME HMO POS MCR                 
2001003, --		AETNA H2663024 HMO MCR                           
2001004, --		AETNA H2663029 PREMIER HMO MCR                   
2001005, --		AETNA H2663034 PREMIER HMO MCR                   
2001006, --		AETNA H266332 GOLD ADVANTAGE VALUE PRIME HMO MCR 
2001007, --		AETNA H26635 GOLD ADVANTAGE PRIME HMO MCR        
2001008, --		AETNA H26636 ADVANTRA OPTION 1 HMO POS MCR       
2001009, --		AETNA H3288 FREEDOM CORE PLAN MCR                
2001010, --		AETNA H2663810 HMO MCR                           
2001011, --		AETNA H5325 ASSURE HMO D SNP MCR                 
2001012, --		AETNA PPO MCR                                    
2001013, --		AETNA H2663023 PRMR PLUS HMO POS MCR             
2001014, --		AETNA H2663036 PREMIER PREFERRED MCR             
2001015, --		AETNA H2663021 PREMIER HMO MCR                   
2001016, --		AETNA H2663022 CORE VALUE HMO MCR                
32001001, --		AETNA 26632 ADVANTRA OPTION 2 HMO MCR CONTRACTED            
32001002, --		AETNA H2663015 PRIME HMO POS MCR CONTRACTED                 
32001003, --		AETNA H2663024 HMO MCR CONTRACTED                           
32001004, --		AETNA H2663029 PREMIER HMO MCR CONTRACTED                   
32001005, --		AETNA H2663034 PREMIER HMO MCR CONTRACTED                   
32001006, --		AETNA H266332 GOLD ADVANTAGE VALUE PRIME HMO MCR CONTRACTED 
32001007, --		AETNA H26635 GOLD ADVANTAGE PRIME HMO MCR CONTRACTED        
32001008, --		AETNA H26636 ADVANTRA OPTION 1 HMO POS MCR CONTRACTED       
32001009, --		AETNA H3288 FREEDOM CORE PLAN MCR CONTRACTED               
32001010, --		AETNA H2663810 HMO MCR CONTRACTED                           
32001011, --		AETNA H5325 ASSURE HMO D SNP MCR CONTRACTED                 
32001012, --		AETNA PPO MCR CONTRACTED                                    
32001013, --		AETNA H2663023 PRMR PLUS HMO POS MCR CONTRACTED             
32001014, --		AETNA H2663036 PREMIER PREFERRED MCR CONTRACTED             
32001015, --		AETNA H2663021 PREMIER HMO MCR CONTRACTED                   
32001016) --		AETNA H2663022 CORE VALUE HMO MCR CONTRACTED   










____________________________________________________________________________________________________________________________________________________________________________________________________________________________
---- aetna_IP_DX_query



--drop table aetna_IP_DX_query;

create table aetna_IP_DX_query as
select distinct main.Encounter_ID,
main.Date_of_Service_From,
main.Date_of_Service_Thru,
replace(edg.ref_bill_code,'.','')as dx,
--rpad(edg.ref_bill_code,'8') dx,
hadx.line--,
--main.cpt
from  aetna_main_query main 
join hsp_acct_dx_list hadx on main.Encounter_ID = hadx.hsp_account_id
 join clarity_edg edg on hadx.dx_id = edg.dx_id
 where 1=1
order by hadx.line

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 1-30 dx codes.



with cohert as(

select distinct
opdx.Encounter_ID,
rev_code,
 'D' as record_type,
 record_id,
 'I' as Claim_type_Indicator,
 'CR' as Supplemental_type,
  original_record_id,
system_source,
 '1' as claim_Ind,
plan_claim_number,
original_plan_claim_id,
CMS_Contract_Number,
case when length(HICN) <>11 then ''
 when HICN = '00000000000' then ''
 when HICN = '99999999999' then ''
 else HICN 
 end as HICN ,
Member_ID,
pat_last_name,
pat_first_name,
middle_name,
member_name_suffix,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code,
member_zip4,
Member_county_residence,
Member_Country,
Member_country_Subdivision,
Member_Group_number,
Member_DOB,
 GENDER,
ssn,
pcp_id,
pcp_name_l,
pcp_name_f,
Patient_account_num,
provider_type,
Sub_P_L_Name,
 Sub_p_F_name,	
Sub_p_id,
Sub_P_Cred,
Rendering_P_Org,	
Rendering_P_Group,
rend_Prov_Last,
rend_Prov_First,
rend_middle,
rend_suffix,
prov_addr_1,
prov_addr_2,
prov_city_name,
prov_state_name,
rpad(prov_zip_cd,5)prov_zip_cd,
prov_zip4,
Provider_NPI,
provider_tax_id,
Rendering_P_T_Code,
Rendering_State_license,
Rendering_Upin,
Rendering_plan_Provider_ID,
Rendering_Plan_Loc,
Rendering_Plan_Last,
Rendering_Plan_First,
Rendering_Prov_Cred,
Rendering_P_phone,
Oversight_P_L,
Oversight_P_N,
Oversight_P_M,
Oversight_S,
Oversight_Add_1,
Oversight_Add_2,
Oversight_City,
Oversight_State,
Over_Provider_zip,
Over_Provider_zip4,
Over_P_Cred,
opdx.Date_of_Service_From,
opdx.Date_of_Service_Thru,
facility_name,
POA1,
POA2,
POA3,
POA4,
POA5,
POA6,
POA7,
POA8,
POA9,
POA10,
POA11,
POA12,
POA13,
POA14,
POA15,
POA16,
POA17,
POA18,
POA19,
POA20,
POA21,
POA22,
POA23,
POA24,
POA25,
POA26,
POA27,
POA28,
POA29,
POA30,
diag1_qual,
diag2_qual,
diag3_qual,
diag4_qual,
diag5_qual,
diag6_qual,
diag7_qual,
diag8_qual,
diag9_qual,
diag10_qual,
diag11_qual,
diag12_qual,
diag13_qual,
diag14_qual,
diag15_qual,
diag16_qual,
diag17_qual,
diag18_qual,
diag19_qual,
diag20_qual,
diag21_qual,
diag22_qual,
diag23_qual,
diag24_qual,
diag25_qual,
diag26_qual,
diag27_qual,
diag28_qual,
diag29_qual,
diag30_qual,
ra1,
ra2,
ra3,
ra4,
ra5,
ra6,
ra7,
ra8,
ra9,
ra10,
ra11,
ra12,
ra13,
ra14,
ra15,
ra16,
ra17,
ra18,
ra19,
ra20,
ra21,
ra22,
ra23,
ra24,
ra25,
ra26,
ra27,
ra28,
ra29,
ra30,
del_diag1,
del_diag2,
del_diag3,
del_diag4,
del_diag5,
del_diag6,
del_diag7,
del_diag8,
del_diag9,
del_diag10,
del_diag11,
del_diag12,
del_diag13,
del_diag14,
del_diag15,
del_diag16,
del_diag17,
del_diag18,
del_diag19,
del_diag20,
del_diag21,
del_diag22,
del_diag23,
del_diag24,
del_diag25,
del_diag26,
del_diag27,
del_diag28,
del_diag29,
del_diag30,
option_ind_1,
option_ind_2,
option_ind_3,
option_ind_4,
option_ind_5,
option_ind_6,
option_ind_7,
option_ind_8,
option_ind_9,
option_ind_10,
 '^' as End_of_Rec
 from
 aetna_ip_dx_query opdx
 join aetna_main_query main on main.encounter_id = opdx.encounter_id

 where 1=1
) 
select distinct 
c.encounter_id,
c.rev_code,
c.record_type,
c. record_id,
c.Claim_type_Indicator,
c.Supplemental_type,
c.original_record_id,
c.system_source,
c.claim_Ind,
c.plan_claim_number,
c.original_plan_claim_id,
c.CMS_Contract_Number,
c.HICN,
c.Member_ID,
c.pat_last_name,
c.pat_first_name,
c.middle_name,
c.member_name_suffix,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.member_zip4,
c.Member_county_residence,
c.Member_Country,
c.Member_country_Subdivision,
c.Member_Group_number,
c.Member_DOB,
c.GENDER,
c.ssn,
c.pcp_id,
c.pcp_name_l,
c.pcp_name_f,
c.Patient_account_num,
c.provider_type,
c.Sub_P_L_Name,
c.Sub_p_F_name,	
c.Sub_p_id,
c.Sub_P_Cred,
c.Rendering_P_Org,	
c.Rendering_P_Group,
c.rend_Prov_Last,
c.rend_Prov_First,
c.rend_middle,
c.rend_suffix,
c.prov_addr_1,
c.prov_addr_2,
c.prov_city_name,
c.prov_state_name,
c.prov_zip_cd,
c.prov_zip4,
c.Provider_NPI,
c.provider_tax_id,
c.Rendering_P_T_Code,
c.Rendering_State_license,
c.Rendering_Upin,
c.Rendering_plan_Provider_ID,
c.Rendering_Plan_Loc,
c.Rendering_Plan_Last,
c.Rendering_Plan_First,
c.Rendering_Prov_Cred,
c.Rendering_P_phone,
c.Oversight_P_L,
c.Oversight_P_N,
c.Oversight_P_M,
c.Oversight_S,
c.Oversight_Add_1,
c.Oversight_Add_2,
c.Oversight_City,
c.Oversight_State,
c.Over_Provider_zip,
c.Over_Provider_zip4,
c.Over_P_Cred,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
c.facility_name,
opdx1.dx as dx_1,
c.POA1,
case when c.diag1_qual is null and opdx1.dx is NOT null
THEN 'ABF'
else null
end diag1_qual,
c.ra1,
c.del_diag1, 
opdx2.dx as dx_2,
c.POA2,
case when c.diag2_qual is null and opdx2.dx is NOT null
THEN 'ABF'
else null
end diag2_qual,
c.ra2,
c.del_diag2,
opdx3.dx as dx_3,
c.POA3,
case when c.diag3_qual is null and opdx3.dx is NOT null
THEN 'ABF'
else null
end diag3_qual,
c.ra3,
c.del_diag3,
opdx4.dx as dx_4,
c.POA4,
case when c.diag4_qual is null and opdx4.dx is NOT null
THEN 'ABF'
else null
end diag4_qual,
c.ra4,
c.del_diag4,
opdx5.dx as dx_5,
c.POA5,
case when c.diag5_qual is null and opdx5.dx is NOT null
THEN 'ABF'
else null
end diag5_qual,
c.ra5,
c.del_diag5,
opdx6.dx as dx_6,
c.POA6,
case when c.diag6_qual is null and opdx6.dx is NOT null
THEN 'ABF'
else null
end diag6_qual,
c.ra6,
c.del_diag6,
opdx7.dx as dx_7,
c.POA7,
case when c.diag7_qual is null and opdx7.dx is NOT null
THEN 'ABF'
else null
end diag7_qual,
c.ra7,
c.del_diag7,
opdx8.dx as dx_8,
c.POA8,
case when c.diag8_qual is null and opdx8.dx is NOT null
THEN 'ABF'
else null
end diag8_qual,
c.ra8,
c.del_diag8,
opdx9.dx as dx_9,
c.POA9,
case when c.diag9_qual is null and opdx9.dx is NOT null
THEN 'ABF'
else null
end diag9_qual,
c.ra9,
c.del_diag9,
opdx10.dx as dx_10,
c.POA10,
case when c.diag10_qual is null and opdx10.dx is NOT null
THEN 'ABF'
else null
end diag10_qual,
c.ra10,
c.del_diag10,
opdx11.dx as dx_11,
POA11,
case when c.diag11_qual is null and opdx11.dx is NOT null
THEN 'ABF'
else null
end diag11_qual,
c.ra11,
c.del_diag11,
opdx12.dx as dx_12,
c.POA12,
case when c.diag12_qual is null and opdx12.dx is NOT null
THEN 'ABF'
else null
end diag12_qual,
c.ra12,
c.del_diag12,
opdx13.dx as dx_13,
c.POA13,
case when c.diag13_qual is null and opdx13.dx is NOT null
THEN 'ABF'
else null
end diag13_qual,
c.ra13,
c.del_diag13,
opdx14.dx as dx_14,
c.POA14,
case when c.diag14_qual is null and opdx14.dx is NOT null
THEN 'ABF'
else null
end diag14_qual,
c.ra14,
c.del_diag14,
opdx15.dx as dx_15,
c.POA15,
case when c.diag15_qual is null and opdx15.dx is NOT null
THEN 'ABF'
else null
end diag15_qual,
c.ra15,
c.del_diag15,
opdx16.dx as dx_16,
c.POA16,
case when c.diag16_qual is null and opdx16.dx is NOT null
THEN 'ABF'
else null
end diag16_qual,
c.ra16,
c.del_diag16,
opdx17.dx as dx_17,
c.POA17,
case when c.diag17_qual is null and opdx17.dx is NOT null
THEN 'ABF'
else null
end diag17_qual,
c.ra17,
c.del_diag17,
opdx18.dx as dx_18,
c.POA18,
case when c.diag18_qual is null and opdx18.dx is NOT null
THEN 'ABF'
else null
end diag18_qual,
c.ra18,
del_diag18,
opdx19.dx as dx_19,
c.POA19,
case when c.diag19_qual is null and opdx19.dx is NOT null
THEN 'ABF'
else null
end diag19_qual,
c.ra19,
c.del_diag19,
opdx20.dx as dx_20,
c.POA20,
case when c.diag20_qual is null and opdx20.dx is NOT null
THEN 'ABF'
else null
end diag20_qual,
c.ra20,
c.del_diag20,
opdx21.dx as dx_21,
c.POA21,
case when c.diag21_qual is null and opdx21.dx is NOT null
THEN 'ABF'
else null
end diag21_qual,
c.ra21,
c.del_diag21,
opdx22.dx as dx_22,
c.POA22,
case when c.diag22_qual is null and opdx22.dx is NOT null
THEN 'ABF'
else null
end diag22_qual,
c.ra22,
c.del_diag22,
opdx23.dx as dx_23,
c.POA23,
case when c.diag23_qual is null and opdx23.dx is NOT null
THEN 'ABF'
else null
end diag23_qual,
c.ra23,
c.del_diag23,
opdx24.dx as dx_24,
c.POA24,
case when c.diag24_qual is null and opdx24.dx is NOT null
THEN 'ABF'
else null
end diag24_qual,
c.ra24,
c.del_diag24,
opdx25.dx as dx_25,
c.POA25,
case when c.diag25_qual is null and opdx25.dx is NOT null
THEN 'ABF'
else null
end diag25_qual,
c.ra25,
c.del_diag25,
opdx26.dx as dx_26,
c.POA26,
case when c.diag26_qual is null and opdx26.dx is NOT null
THEN 'ABF'
else null
end diag26_qual,
c.ra26,
c.del_diag26,
opdx27.dx as dx_27,
c.POA27,
case when c.diag27_qual is null and opdx27.dx is NOT null
THEN 'ABF'
else null
end diag27_qual,
c.ra27,
c.del_diag27,
opdx28.dx as dx_28,
c.POA28,
case when c.diag28_qual is null and opdx28.dx is NOT null
THEN 'ABF'
else null
end diag28_qual,
c.ra28,
c.del_diag28,
opdx29.dx as dx_29,
c.POA29,
case when c.diag29_qual is null and opdx29.dx is NOT null
THEN 'ABF'
else null
end diag29_qual,
c.ra29,
c.del_diag29,
opdx30.dx as dx_30,
c.POA30,
case when c.diag30_qual is null and opdx30.dx is NOT null
THEN 'ABF'
else null
end diag30_qual,
c.ra30,
c.del_diag30,
c.option_ind_1,
c.option_ind_2,
c.option_ind_3,
c.option_ind_4,
c.option_ind_5,
c.option_ind_6,
c.option_ind_7,
c.option_ind_8,
c.option_ind_9,
c.option_ind_10,
c.End_of_Rec
      from cohert c
  left join aetna_ip_dx_query opdx1 on opdx1.encounter_id = c.encounter_id      
                       and opdx1.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx1.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx1.cpt_code = c.cpt_code
                        and  opdx1.line = 1                   
   left join aetna_ip_dx_query opdx2 on opdx2.encounter_id = c.encounter_id      
                       and opdx2.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx2.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx2.cpt_code = c.cpt_code
                        and  opdx2.line = 2                                     
   left join aetna_ip_dx_query opdx3 on opdx3.encounter_id = c.encounter_id      
                       and opdx3.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx3.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx3.cpt_code = c.cpt_code
                        and  opdx3.line = 3   
    left join aetna_ip_dx_query opdx4 on opdx4.encounter_id = c.encounter_id      
                       and opdx4.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx4.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx4.cpt_code = c.cpt_code
                        and  opdx4.line = 4   
   left join aetna_ip_dx_query opdx5 on opdx5.encounter_id = c.encounter_id      
                       and opdx5.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx5.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx5.cpt_code = c.cpt_code
                        and  opdx5.line = 5   
   left join aetna_ip_dx_query opdx6 on opdx6.encounter_id = c.encounter_id      
                       and opdx6.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx6.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx6.cpt_code = c.cpt_code
                        and  opdx6.line = 6   
   left join aetna_ip_dx_query opdx7 on opdx7.encounter_id = c.encounter_id      
                       and opdx7.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx7.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx7.cpt_code = c.cpt_code
                        and  opdx7.line = 7   
   left join aetna_ip_dx_query opdx8 on opdx8.encounter_id = c.encounter_id      
                       and opdx8.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx8.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx8.cpt_code = c.cpt_code
                        and  opdx8.line = 8   
   left join aetna_ip_dx_query opdx9 on opdx9.encounter_id = c.encounter_id      
                       and opdx9.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx9.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx9.cpt_code = c.cpt_code
                        and  opdx9.line = 9   
   left join aetna_ip_dx_query opdx10 on opdx10.encounter_id = c.encounter_id      
                       and opdx10.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx10.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx10.cpt_code = c.cpt_code
                        and  opdx10.line = 10   
   left join aetna_ip_dx_query opdx11 on opdx11.encounter_id = c.encounter_id      
                       and opdx11.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx11.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx11.cpt_code = c.cpt_code
                        and  opdx11.line = 11   
   left join aetna_ip_dx_query opdx12 on opdx12.encounter_id = c.encounter_id      
                       and opdx12.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx12.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx12.cpt_code = c.cpt_code
                        and  opdx12.line = 12   
   left join aetna_ip_dx_query opdx13 on opdx13.encounter_id = c.encounter_id      
                       and opdx13.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx13.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx13.line = 13   
   left join aetna_ip_dx_query opdx14 on opdx14.encounter_id = c.encounter_id      
                       and opdx14.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx14.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx14.cpt_code = c.cpt_code
                       and  opdx14.line = 14   
   left join aetna_ip_dx_query opdx15 on opdx15.encounter_id = c.encounter_id      
                       and opdx15.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx15.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx15.cpt_code = c.cpt_code
                        and  opdx15.line = 15   
   left join aetna_ip_dx_query opdx16 on opdx16.encounter_id = c.encounter_id      
                       and opdx16.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx16.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx16.cpt_code = c.cpt_code
                        and  opdx16.line = 16   
    left join aetna_ip_dx_query opdx17 on opdx17.encounter_id = c.encounter_id      
                       and opdx17.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx17.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx17.cpt_code = c.cpt_code
                        and  opdx17.line = 17   
   left join aetna_ip_dx_query opdx18 on opdx18.encounter_id = c.encounter_id      
                       and opdx18.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx18.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx18.cpt_code = c.cpt_code
                        and  opdx18.line = 18   
   left join aetna_ip_dx_query opdx19 on opdx19.encounter_id = c.encounter_id      
                       and opdx19.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx19.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx19.cpt_code = c.cpt_code
                        and  opdx19.line = 19   
   left join aetna_ip_dx_query opdx20 on opdx20.encounter_id = c.encounter_id      
                       and opdx20.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx20.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx20.cpt_code = c.cpt_code
                        and  opdx20.line = 20   
   left join aetna_ip_dx_query opdx21 on opdx21.encounter_id = c.encounter_id      
                       and opdx21.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx21.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx21.cpt_code = c.cpt_code
                        and  opdx21.line = 21   
   left join aetna_ip_dx_query opdx22 on opdx22.encounter_id = c.encounter_id      
                       and opdx22.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx22.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx22.cpt_code = c.cpt_code
                        and  opdx22.line = 22   
   left join aetna_ip_dx_query opdx23 on opdx23.encounter_id = c.encounter_id      
                       and opdx23.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx23.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx23.cpt_code = c.cpt_code
                        and  opdx23.line = 23   
   left join aetna_ip_dx_query opdx24 on opdx24.encounter_id = c.encounter_id      
                       and opdx24.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx24.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx24.cpt_code = c.cpt_code
                        and  opdx24.line = 24   
   left join aetna_ip_dx_query opdx25 on opdx25.encounter_id = c.encounter_id      
                       and opdx25.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx25.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx25.cpt_code = c.cpt_code
                        and  opdx25.line = 25  
     left join aetna_ip_dx_query opdx26 on opdx26.encounter_id = c.encounter_id      
                       and opdx26.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx26.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx26.cpt_code = c.cpt_code
                        and  opdx26.line = 26 
   left join aetna_ip_dx_query opdx27 on opdx27.encounter_id = c.encounter_id      
                       and opdx27.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx27.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx27.cpt_code = c.cpt_code
                        and  opdx27.line = 27   
   left join aetna_ip_dx_query opdx28 on opdx28.encounter_id = c.encounter_id      
                       and opdx28.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx28.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx28.cpt_code = c.cpt_code
                        and  opdx28.line = 28   
   left join aetna_ip_dx_query opdx29 on opdx29.encounter_id = c.encounter_id      
                       and opdx29.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx29.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx29.cpt_code = c.cpt_code
                        and  opdx29.line = 29   
   left join aetna_ip_dx_query opdx30 on opdx30.encounter_id = c.encounter_id      
                       and opdx30.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx30.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx30.cpt_code = c.cpt_code
                        and  opdx30.line = 30



____________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 31-60 dx codes.
with cohert as(

select distinct
opdx.Encounter_ID,
rev_code,
 'D' as record_type,
 record_id,
 'I' as Claim_type_Indicator,
 'CR' as Supplemental_type,
  original_record_id,
system_source,
 '1' as claim_Ind,
plan_claim_number,
original_plan_claim_id,
CMS_Contract_Number,
case when length(HICN) <>11 then ''
 when HICN = '00000000000' then ''
 when HICN = '99999999999' then ''
 else HICN 
 end as HICN ,
Member_ID,
pat_last_name,
pat_first_name,
middle_name,
member_name_suffix,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code,
member_zip4,
Member_county_residence,
Member_Country,
Member_country_Subdivision,
Member_Group_number,
Member_DOB,
 GENDER,
ssn,
pcp_id,
pcp_name_l,
pcp_name_f,
Patient_account_num,
provider_type,
Sub_P_L_Name,
 Sub_p_F_name,	
Sub_p_id,
Sub_P_Cred,
Rendering_P_Org,	
Rendering_P_Group,
rend_Prov_Last,
rend_Prov_First,
rend_middle,
rend_suffix,
prov_addr_1,
prov_addr_2,
prov_city_name,
prov_state_name,
rpad(prov_zip_cd,5)prov_zip_cd,
prov_zip4,
Provider_NPI,
provider_tax_id,
Rendering_P_T_Code,
Rendering_State_license,
Rendering_Upin,
Rendering_plan_Provider_ID,
Rendering_Plan_Loc,
Rendering_Plan_Last,
Rendering_Plan_First,
Rendering_Prov_Cred,
Rendering_P_phone,
Oversight_P_L,
Oversight_P_N,
Oversight_P_M,
Oversight_S,
Oversight_Add_1,
Oversight_Add_2,
Oversight_City,
Oversight_State,
Over_Provider_zip,
Over_Provider_zip4,
Over_P_Cred,
opdx.Date_of_Service_From,
opdx.Date_of_Service_Thru,
facility_name,
POA1,
POA2,
POA3,
POA4,
POA5,
POA6,
POA7,
POA8,
POA9,
POA10,
POA11,
POA12,
POA13,
POA14,
POA15,
POA16,
POA17,
POA18,
POA19,
POA20,
POA21,
POA22,
POA23,
POA24,
POA25,
POA26,
POA27,
POA28,
POA29,
POA30,
diag1_qual,
diag2_qual,
diag3_qual,
diag4_qual,
diag5_qual,
diag6_qual,
diag7_qual,
diag8_qual,
diag9_qual,
diag10_qual,
diag11_qual,
diag12_qual,
diag13_qual,
diag14_qual,
diag15_qual,
diag16_qual,
diag17_qual,
diag18_qual,
diag19_qual,
diag20_qual,
diag21_qual,
diag22_qual,
diag23_qual,
diag24_qual,
diag25_qual,
diag26_qual,
diag27_qual,
diag28_qual,
diag29_qual,
diag30_qual,
ra1,
ra2,
ra3,
ra4,
ra5,
ra6,
ra7,
ra8,
ra9,
ra10,
ra11,
ra12,
ra13,
ra14,
ra15,
ra16,
ra17,
ra18,
ra19,
ra20,
ra21,
ra22,
ra23,
ra24,
ra25,
ra26,
ra27,
ra28,
ra29,
ra30,
del_diag1,
del_diag2,
del_diag3,
del_diag4,
del_diag5,
del_diag6,
del_diag7,
del_diag8,
del_diag9,
del_diag10,
del_diag11,
del_diag12,
del_diag13,
del_diag14,
del_diag15,
del_diag16,
del_diag17,
del_diag18,
del_diag19,
del_diag20,
del_diag21,
del_diag22,
del_diag23,
del_diag24,
del_diag25,
del_diag26,
del_diag27,
del_diag28,
del_diag29,
del_diag30,
option_ind_1,
option_ind_2,
option_ind_3,
option_ind_4,
option_ind_5,
option_ind_6,
option_ind_7,
option_ind_8,
option_ind_9,
option_ind_10,
 '^' as End_of_Rec
 from
 aetna_ip_dx_query opdx
 join aetna_main_query main on main.encounter_id = opdx.encounter_id

 where 1=1
and opdx.line >30

) 
select distinct 
c.encounter_id,
c.rev_code,
c.record_type,
c. record_id,
c.Claim_type_Indicator,
c.Supplemental_type,
c.original_record_id,
c.system_source,
c.claim_Ind,
c.plan_claim_number,
c.original_plan_claim_id,
c.CMS_Contract_Number,
c.HICN,
c.Member_ID,
c.pat_last_name,
c.pat_first_name,
c.middle_name,
c.member_name_suffix,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.member_zip4,
c.Member_county_residence,
c.Member_Country,
c.Member_country_Subdivision,
c.Member_Group_number,
c.Member_DOB,
c.GENDER,
c.ssn,
c.pcp_id,
c.pcp_name_l,
c.pcp_name_f,
c.Patient_account_num,
c.provider_type,
c.Sub_P_L_Name,
c.Sub_p_F_name,	
c.Sub_p_id,
c.Sub_P_Cred,
c.Rendering_P_Org,	
c.Rendering_P_Group,
c.rend_Prov_Last,
c.rend_Prov_First,
c.rend_middle,
c.rend_suffix,
c.prov_addr_1,
c.prov_addr_2,
c.prov_city_name,
c.prov_state_name,
c.prov_zip_cd,
c.prov_zip4,
c.Provider_NPI,
c.provider_tax_id,
c.Rendering_P_T_Code,
c.Rendering_State_license,
c.Rendering_Upin,
c.Rendering_plan_Provider_ID,
c.Rendering_Plan_Loc,
c.Rendering_Plan_Last,
c.Rendering_Plan_First,
c.Rendering_Prov_Cred,
c.Rendering_P_phone,
c.Oversight_P_L,
c.Oversight_P_N,
c.Oversight_P_M,
c.Oversight_S,
c.Oversight_Add_1,
c.Oversight_Add_2,
c.Oversight_City,
c.Oversight_State,
c.Over_Provider_zip,
c.Over_Provider_zip4,
c.Over_P_Cred,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
c.facility_name,
opdx31.dx as dx_1,
c.POA1,
case when c.diag1_qual is null and opdx31.dx is NOT null
THEN 'ABF'
else null
end diag1_qual,
c.ra1,
c.del_diag1, 
opdx32.dx as dx_2,
c.POA2,
case when c.diag2_qual is null and opdx32.dx is NOT null
THEN 'ABF'
else null
end diag2_qual,
c.ra2,
c.del_diag2,
opdx33.dx as dx_3,
c.POA3,
case when c.diag3_qual is null and opdx33.dx is NOT null
THEN 'ABF'
else null
end diag3_qual,
c.ra3,
c.del_diag3,
opdx34.dx as dx_4,
c.POA4,
case when c.diag4_qual is null and opdx34.dx is NOT null
THEN 'ABF'
else null
end diag4_qual,
c.ra4,
c.del_diag4,
opdx35.dx as dx_5,
c.POA5,
case when c.diag5_qual is null and opdx35.dx is NOT null
THEN 'ABF'
else null
end diag5_qual,
c.ra5,
c.del_diag5,
opdx36.dx as dx_6,
c.POA6,
case when c.diag6_qual is null and opdx36.dx is NOT null
THEN 'ABF'
else null
end diag6_qual,
c.ra6,
c.del_diag6,
opdx37.dx as dx_7,
c.POA7,
case when c.diag7_qual is null and opdx37.dx is NOT null
THEN 'ABF'
else null
end diag7_qual,
c.ra7,
c.del_diag7,
opdx38.dx as dx_8,
c.POA8,
case when c.diag8_qual is null and opdx38.dx is NOT null
THEN 'ABF'
else null
end diag8_qual,
c.ra8,
c.del_diag8,
opdx39.dx as dx_9,
c.POA9,
case when c.diag9_qual is null and opdx39.dx is NOT null
THEN 'ABF'
else null
end diag9_qual,
c.ra9,
c.del_diag9,
opdx40.dx as dx_10,
c.POA10,
case when c.diag10_qual is null and opdx40.dx is NOT null
THEN 'ABF'
else null
end diag10_qual,
c.ra10,
c.del_diag10,
opdx41.dx as dx_11,
POA11,
case when c.diag11_qual is null and opdx41.dx is NOT null
THEN 'ABF'
else null
end diag11_qual,
c.ra11,
c.del_diag11,
opdx42.dx as dx_12,
c.POA12,
case when c.diag12_qual is null and opdx42.dx is NOT null
THEN 'ABF'
else null
end diag12_qual,
c.ra12,
c.del_diag12,
opdx43.dx as dx_13,
c.POA13,
case when c.diag13_qual is null and opdx43.dx is NOT null
THEN 'ABF'
else null
end diag13_qual,
c.ra13,
c.del_diag13,
opdx44.dx as dx_14,
c.POA14,
case when c.diag14_qual is null and opdx44.dx is NOT null
THEN 'ABF'
else null
end diag14_qual,
c.ra14,
c.del_diag14,
opdx45.dx as dx_15,
c.POA15,
case when c.diag15_qual is null and opdx45.dx is NOT null
THEN 'ABF'
else null
end diag15_qual,
c.ra15,
c.del_diag15,
opdx46.dx as dx_16,
c.POA16,
case when c.diag16_qual is null and opdx46.dx is NOT null
THEN 'ABF'
else null
end diag16_qual,
c.ra16,
c.del_diag16,
opdx47.dx as dx_17,
c.POA17,
case when c.diag17_qual is null and opdx47.dx is NOT null
THEN 'ABF'
else null
end diag17_qual,
c.ra17,
c.del_diag17,
opdx48.dx as dx_18,
c.POA18,
case when c.diag18_qual is null and opdx48.dx is NOT null
THEN 'ABF'
else null
end diag18_qual,
c.ra18,
del_diag18,
opdx49.dx as dx_19,
c.POA19,
case when c.diag19_qual is null and opdx49.dx is NOT null
THEN 'ABF'
else null
end diag19_qual,
c.ra19,
c.del_diag19,
opdx50.dx as dx_20,
c.POA20,
case when c.diag20_qual is null and opdx50.dx is NOT null
THEN 'ABF'
else null
end diag20_qual,
c.ra20,
c.del_diag20,
opdx51.dx as dx_21,
c.POA21,
case when c.diag21_qual is null and opdx51.dx is NOT null
THEN 'ABF'
else null
end diag21_qual,
c.ra21,
c.del_diag21,
opdx52.dx as dx_22,
c.POA22,
case when c.diag22_qual is null and opdx52.dx is NOT null
THEN 'ABF'
else null
end diag22_qual,
c.ra22,
c.del_diag22,
opdx53.dx as dx_23,
c.POA23,
case when c.diag23_qual is null and opdx53.dx is NOT null
THEN 'ABF'
else null
end diag23_qual,
c.ra23,
c.del_diag23,
opdx54.dx as dx_24,
c.POA24,
case when c.diag24_qual is null and opdx54.dx is NOT null
THEN 'ABF'
else null
end diag24_qual,
c.ra24,
c.del_diag24,
opdx55.dx as dx_25,
c.POA25,
case when c.diag25_qual is null and opdx55.dx is NOT null
THEN 'ABF'
else null
end diag25_qual,
c.ra25,
c.del_diag25,
opdx56.dx as dx_26,
c.POA26,
case when c.diag26_qual is null and opdx56.dx is NOT null
THEN 'ABF'
else null
end diag26_qual,
c.ra26,
c.del_diag26,
opdx57.dx as dx_27,
c.POA27,
case when c.diag27_qual is null and opdx57.dx is NOT null
THEN 'ABF'
else null
end diag27_qual,
c.ra27,
c.del_diag27,
opdx58.dx as dx_28,
c.POA28,
case when c.diag28_qual is null and opdx58.dx is NOT null
THEN 'ABF'
else null
end diag28_qual,
c.ra28,
c.del_diag28,
opdx59.dx as dx_29,
c.POA29,
case when c.diag29_qual is null and opdx59.dx is NOT null
THEN 'ABF'
else null
end diag29_qual,
c.ra29,
c.del_diag29,
opdx60.dx as dx_30,
c.POA30,
case when c.diag30_qual is null and opdx60.dx is NOT null
THEN 'ABF'
else null
end diag30_qual,
c.ra30,
c.del_diag30,
c.option_ind_1,
c.option_ind_2,
c.option_ind_3,
c.option_ind_4,
c.option_ind_5,
c.option_ind_6,
c.option_ind_7,
c.option_ind_8,
c.option_ind_9,
c.option_ind_10,
c.End_of_Rec
      from cohert c
  left join aetna_ip_dx_query opdx31 on opdx31.encounter_id = c.encounter_id      
                       and opdx31.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx31.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx1.cpt_code = c.cpt_code
                        and  opdx31.line = 31                   
   left join aetna_ip_dx_query opdx32 on opdx32.encounter_id = c.encounter_id      
                       and opdx32.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx32.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx2.cpt_code = c.cpt_code
                        and  opdx32.line = 32                                     
   left join aetna_ip_dx_query opdx33 on opdx33.encounter_id = c.encounter_id      
                       and opdx33.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx33.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx3.cpt_code = c.cpt_code
                        and  opdx33.line = 33   
    left join aetna_ip_dx_query opdx34 on opdx34.encounter_id = c.encounter_id      
                       and opdx34.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx34.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx4.cpt_code = c.cpt_code
                        and  opdx34.line = 34   
   left join aetna_ip_dx_query opdx35 on opdx35.encounter_id = c.encounter_id      
                       and opdx35.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx35.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx5.cpt_code = c.cpt_code
                        and  opdx35.line = 35   
   left join aetna_ip_dx_query opdx36 on opdx36.encounter_id = c.encounter_id      
                       and opdx36.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx36.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx6.cpt_code = c.cpt_code
                        and  opdx36.line = 36   
   left join aetna_ip_dx_query opdx37 on opdx37.encounter_id = c.encounter_id      
                       and opdx37.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx37.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx7.cpt_code = c.cpt_code
                        and  opdx37.line = 37   
   left join aetna_ip_dx_query opdx38 on opdx38.encounter_id = c.encounter_id      
                       and opdx38.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx38.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx8.cpt_code = c.cpt_code
                        and  opdx38.line = 38   
   left join aetna_ip_dx_query opdx39 on opdx39.encounter_id = c.encounter_id      
                       and opdx39.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx39.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx9.cpt_code = c.cpt_code
                        and  opdx39.line = 39   
   left join aetna_ip_dx_query opdx40 on opdx40.encounter_id = c.encounter_id      
                       and opdx40.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx40.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx10.cpt_code = c.cpt_code
                        and  opdx40.line = 40   
   left join aetna_ip_dx_query opdx41 on opdx41.encounter_id = c.encounter_id      
                       and opdx41.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx41.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx11.cpt_code = c.cpt_code
                        and  opdx41.line = 41   
   left join aetna_ip_dx_query opdx42 on opdx42.encounter_id = c.encounter_id      
                       and opdx42.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx42.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx12.cpt_code = c.cpt_code
                        and  opdx42.line = 42   
   left join aetna_ip_dx_query opdx43 on opdx43.encounter_id = c.encounter_id      
                       and opdx43.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx43.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx13.cpt_code = c.cpt_code
                        and  opdx43.line = 43   
   left join aetna_ip_dx_query opdx44 on opdx44.encounter_id = c.encounter_id      
                       and opdx44.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx44.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx14.cpt_code = c.cpt_code
                       and  opdx44.line = 44   
   left join aetna_ip_dx_query opdx45 on opdx45.encounter_id = c.encounter_id      
                       and opdx45.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx45.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx15.cpt_code = c.cpt_code
                        and  opdx45.line = 45   
   left join aetna_ip_dx_query opdx46 on opdx46.encounter_id = c.encounter_id      
                       and opdx46.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx46.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx16.cpt_code = c.cpt_code
                        and  opdx46.line = 46   
    left join aetna_ip_dx_query opdx47 on opdx47.encounter_id = c.encounter_id      
                       and opdx47.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx47.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx17.cpt_code = c.cpt_code
                        and  opdx47.line = 47   
   left join aetna_ip_dx_query opdx48 on opdx48.encounter_id = c.encounter_id      
                       and opdx48.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx48.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx18.cpt_code = c.cpt_code
                        and  opdx48.line = 48   
   left join aetna_ip_dx_query opdx49 on opdx49.encounter_id = c.encounter_id      
                       and opdx49.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx49.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx19.cpt_code = c.cpt_code
                        and  opdx49.line = 49   
   left join aetna_ip_dx_query opdx50 on opdx50.encounter_id = c.encounter_id      
                       and opdx50.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx50.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx20.cpt_code = c.cpt_code
                        and  opdx50.line = 50   
   left join aetna_ip_dx_query opdx51 on opdx51.encounter_id = c.encounter_id      
                       and opdx51.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx51.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx21.cpt_code = c.cpt_code
                        and  opdx51.line = 51   
   left join aetna_ip_dx_query opdx52 on opdx52.encounter_id = c.encounter_id      
                       and opdx52.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx52.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx22.cpt_code = c.cpt_code
                        and  opdx52.line = 52   
   left join aetna_ip_dx_query opdx53 on opdx53.encounter_id = c.encounter_id      
                       and opdx53.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx53.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx23.cpt_code = c.cpt_code
                        and  opdx53.line = 53   
   left join aetna_ip_dx_query opdx54 on opdx54.encounter_id = c.encounter_id      
                       and opdx54.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx54.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx24.cpt_code = c.cpt_code
                        and  opdx54.line = 54   
   left join aetna_ip_dx_query opdx55 on opdx55.encounter_id = c.encounter_id      
                       and opdx55.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx55.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx25.cpt_code = c.cpt_code
                        and  opdx55.line = 55  
     left join aetna_ip_dx_query opdx56 on opdx56.encounter_id = c.encounter_id      
                       and opdx56.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx56.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx26.cpt_code = c.cpt_code
                        and  opdx56.line = 56 
   left join aetna_ip_dx_query opdx57 on opdx57.encounter_id = c.encounter_id      
                       and opdx57.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx57.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx27.cpt_code = c.cpt_code
                        and  opdx57.line = 57   
   left join aetna_ip_dx_query opdx58 on opdx58.encounter_id = c.encounter_id      
                       and opdx58.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx58.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx28.cpt_code = c.cpt_code
                        and  opdx58.line = 58   
   left join aetna_ip_dx_query opdx59 on opdx59.encounter_id = c.encounter_id      
                       and opdx59.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx59.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx29.cpt_code = c.cpt_code
                        and  opdx59.line = 59   
   left join aetna_ip_dx_query opdx60 on opdx60.encounter_id = c.encounter_id      
                       and opdx60.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx60.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx30.cpt_code = c.cpt_code
                        and  opdx60.line = 60

______________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 61-90 dx codes.


with cohert as(

select distinct
opdx.Encounter_ID,
rev_code,
 'D' as record_type,
 record_id,
 'I' as Claim_type_Indicator,
 'CR' as Supplemental_type,
  original_record_id,
system_source,
 '1' as claim_Ind,
plan_claim_number,
original_plan_claim_id,
CMS_Contract_Number,
case when length(HICN) <>11 then ''
 when HICN = '00000000000' then ''
 when HICN = '99999999999' then ''
 else HICN 
 end as HICN ,
Member_ID,
pat_last_name,
pat_first_name,
middle_name,
member_name_suffix,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code,
member_zip4,
Member_county_residence,
Member_Country,
Member_country_Subdivision,
Member_Group_number,
Member_DOB,
 GENDER,
ssn,
pcp_id,
pcp_name_l,
pcp_name_f,
Patient_account_num,
provider_type,
Sub_P_L_Name,
 Sub_p_F_name,	
Sub_p_id,
Sub_P_Cred,
Rendering_P_Org,	
Rendering_P_Group,
rend_Prov_Last,
rend_Prov_First,
rend_middle,
rend_suffix,
prov_addr_1,
prov_addr_2,
prov_city_name,
prov_state_name,
rpad(prov_zip_cd,5)prov_zip_cd,
prov_zip4,
Provider_NPI,
provider_tax_id,
Rendering_P_T_Code,
Rendering_State_license,
Rendering_Upin,
Rendering_plan_Provider_ID,
Rendering_Plan_Loc,
Rendering_Plan_Last,
Rendering_Plan_First,
Rendering_Prov_Cred,
Rendering_P_phone,
Oversight_P_L,
Oversight_P_N,
Oversight_P_M,
Oversight_S,
Oversight_Add_1,
Oversight_Add_2,
Oversight_City,
Oversight_State,
Over_Provider_zip,
Over_Provider_zip4,
Over_P_Cred,
opdx.Date_of_Service_From,
opdx.Date_of_Service_Thru,
facility_name,
POA1,
POA2,
POA3,
POA4,
POA5,
POA6,
POA7,
POA8,
POA9,
POA10,
POA11,
POA12,
POA13,
POA14,
POA15,
POA16,
POA17,
POA18,
POA19,
POA20,
POA21,
POA22,
POA23,
POA24,
POA25,
POA26,
POA27,
POA28,
POA29,
POA30,
diag1_qual,
diag2_qual,
diag3_qual,
diag4_qual,
diag5_qual,
diag6_qual,
diag7_qual,
diag8_qual,
diag9_qual,
diag10_qual,
diag11_qual,
diag12_qual,
diag13_qual,
diag14_qual,
diag15_qual,
diag16_qual,
diag17_qual,
diag18_qual,
diag19_qual,
diag20_qual,
diag21_qual,
diag22_qual,
diag23_qual,
diag24_qual,
diag25_qual,
diag26_qual,
diag27_qual,
diag28_qual,
diag29_qual,
diag30_qual,
ra1,
ra2,
ra3,
ra4,
ra5,
ra6,
ra7,
ra8,
ra9,
ra10,
ra11,
ra12,
ra13,
ra14,
ra15,
ra16,
ra17,
ra18,
ra19,
ra20,
ra21,
ra22,
ra23,
ra24,
ra25,
ra26,
ra27,
ra28,
ra29,
ra30,
del_diag1,
del_diag2,
del_diag3,
del_diag4,
del_diag5,
del_diag6,
del_diag7,
del_diag8,
del_diag9,
del_diag10,
del_diag11,
del_diag12,
del_diag13,
del_diag14,
del_diag15,
del_diag16,
del_diag17,
del_diag18,
del_diag19,
del_diag20,
del_diag21,
del_diag22,
del_diag23,
del_diag24,
del_diag25,
del_diag26,
del_diag27,
del_diag28,
del_diag29,
del_diag30,
option_ind_1,
option_ind_2,
option_ind_3,
option_ind_4,
option_ind_5,
option_ind_6,
option_ind_7,
option_ind_8,
option_ind_9,
option_ind_10,
 '^' as End_of_Rec
 from
 aetna_ip_dx_query opdx
 join aetna_main_query main on main.encounter_id = opdx.encounter_id

 where 1=1
 and opdx.line >60
) 
select distinct 
c.encounter_id,
c.rev_code,
c.record_type,
c. record_id,
c.Claim_type_Indicator,
c.Supplemental_type,
c.original_record_id,
c.system_source,
c.claim_Ind,
c.plan_claim_number,
c.original_plan_claim_id,
c.CMS_Contract_Number,
c.HICN,
c.Member_ID,
c.pat_last_name,
c.pat_first_name,
c.middle_name,
c.member_name_suffix,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.member_zip4,
c.Member_county_residence,
c.Member_Country,
c.Member_country_Subdivision,
c.Member_Group_number,
c.Member_DOB,
c.GENDER,
c.ssn,
c.pcp_id,
c.pcp_name_l,
c.pcp_name_f,
c.Patient_account_num,
c.provider_type,
c.Sub_P_L_Name,
c.Sub_p_F_name,	
c.Sub_p_id,
c.Sub_P_Cred,
c.Rendering_P_Org,	
c.Rendering_P_Group,
c.rend_Prov_Last,
c.rend_Prov_First,
c.rend_middle,
c.rend_suffix,
c.prov_addr_1,
c.prov_addr_2,
c.prov_city_name,
c.prov_state_name,
c.prov_zip_cd,
c.prov_zip4,
c.Provider_NPI,
c.provider_tax_id,
c.Rendering_P_T_Code,
c.Rendering_State_license,
c.Rendering_Upin,
c.Rendering_plan_Provider_ID,
c.Rendering_Plan_Loc,
c.Rendering_Plan_Last,
c.Rendering_Plan_First,
c.Rendering_Prov_Cred,
c.Rendering_P_phone,
c.Oversight_P_L,
c.Oversight_P_N,
c.Oversight_P_M,
c.Oversight_S,
c.Oversight_Add_1,
c.Oversight_Add_2,
c.Oversight_City,
c.Oversight_State,
c.Over_Provider_zip,
c.Over_Provider_zip4,
c.Over_P_Cred,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
c.facility_name,
opdx61.dx as dx_1,
c.POA1,
case when c.diag1_qual is null and opdx61.dx is NOT null
THEN 'ABF'
else null
end diag1_qual,
c.ra1,
c.del_diag1, 
opdx62.dx as dx_2,
c.POA2,
case when c.diag2_qual is null and opdx62.dx is NOT null
THEN 'ABF'
else null
end diag2_qual,
c.ra2,
c.del_diag2,
opdx63.dx as dx_3,
c.POA3,
case when c.diag3_qual is null and opdx63.dx is NOT null
THEN 'ABF'
else null
end diag3_qual,
c.ra3,
c.del_diag3,
opdx64.dx as dx_4,
c.POA4,
case when c.diag4_qual is null and opdx64.dx is NOT null
THEN 'ABF'
else null
end diag4_qual,
c.ra4,
c.del_diag4,
opdx65.dx as dx_5,
c.POA5,
case when c.diag5_qual is null and opdx65.dx is NOT null
THEN 'ABF'
else null
end diag5_qual,
c.ra5,
c.del_diag5,
opdx66.dx as dx_6,
c.POA6,
case when c.diag6_qual is null and opdx66.dx is NOT null
THEN 'ABF'
else null
end diag6_qual,
c.ra6,
c.del_diag6,
opdx67.dx as dx_7,
c.POA7,
case when c.diag7_qual is null and opdx67.dx is NOT null
THEN 'ABF'
else null
end diag7_qual,
c.ra7,
c.del_diag7,
opdx68.dx as dx_8,
c.POA8,
case when c.diag8_qual is null and opdx68.dx is NOT null
THEN 'ABF'
else null
end diag8_qual,
c.ra8,
c.del_diag8,
opdx69.dx as dx_9,
c.POA9,
case when c.diag9_qual is null and opdx69.dx is NOT null
THEN 'ABF'
else null
end diag9_qual,
c.ra9,
c.del_diag9,
opdx70.dx as dx_10,
c.POA10,
case when c.diag10_qual is null and opdx70.dx is NOT null
THEN 'ABF'
else null
end diag10_qual,
c.ra10,
c.del_diag10,
opdx71.dx as dx_11,
POA11,
case when c.diag11_qual is null and opdx71.dx is NOT null
THEN 'ABF'
else null
end diag11_qual,
c.ra11,
c.del_diag11,
opdx72.dx as dx_12,
c.POA12,
case when c.diag12_qual is null and opdx72.dx is NOT null
THEN 'ABF'
else null
end diag12_qual,
c.ra12,
c.del_diag12,
opdx73.dx as dx_13,
c.POA13,
case when c.diag13_qual is null and opdx73.dx is NOT null
THEN 'ABF'
else null
end diag13_qual,
c.ra13,
c.del_diag13,
opdx74.dx as dx_14,
c.POA14,
case when c.diag14_qual is null and opdx74.dx is NOT null
THEN 'ABF'
else null
end diag14_qual,
c.ra14,
c.del_diag14,
opdx75.dx as dx_15,
c.POA15,
case when c.diag15_qual is null and opdx75.dx is NOT null
THEN 'ABF'
else null
end diag15_qual,
c.ra15,
c.del_diag15,
opdx76.dx as dx_16,
c.POA16,
case when c.diag16_qual is null and opdx76.dx is NOT null
THEN 'ABF'
else null
end diag16_qual,
c.ra16,
c.del_diag16,
opdx77.dx as dx_17,
c.POA17,
case when c.diag17_qual is null and opdx77.dx is NOT null
THEN 'ABF'
else null
end diag17_qual,
c.ra17,
c.del_diag17,
opdx78.dx as dx_18,
c.POA18,
case when c.diag18_qual is null and opdx78.dx is NOT null
THEN 'ABF'
else null
end diag18_qual,
c.ra18,
del_diag18,
opdx79.dx as dx_19,
c.POA19,
case when c.diag19_qual is null and opdx79.dx is NOT null
THEN 'ABF'
else null
end diag19_qual,
c.ra19,
c.del_diag19,
opdx80.dx as dx_20,
c.POA20,
case when c.diag20_qual is null and opdx80.dx is NOT null
THEN 'ABF'
else null
end diag20_qual,
c.ra20,
c.del_diag20,
opdx81.dx as dx_21,
c.POA21,
case when c.diag21_qual is null and opdx81.dx is NOT null
THEN 'ABF'
else null
end diag21_qual,
c.ra21,
c.del_diag21,
opdx82.dx as dx_22,
c.POA22,
case when c.diag22_qual is null and opdx82.dx is NOT null
THEN 'ABF'
else null
end diag22_qual,
c.ra22,
c.del_diag22,
opdx83.dx as dx_23,
c.POA23,
case when c.diag23_qual is null and opdx83.dx is NOT null
THEN 'ABF'
else null
end diag23_qual,
c.ra23,
c.del_diag23,
opdx84.dx as dx_24,
c.POA24,
case when c.diag24_qual is null and opdx84.dx is NOT null
THEN 'ABF'
else null
end diag24_qual,
c.ra24,
c.del_diag24,
opdx85.dx as dx_25,
c.POA25,
case when c.diag25_qual is null and opdx85.dx is NOT null
THEN 'ABF'
else null
end diag25_qual,
c.ra25,
c.del_diag25,
opdx86.dx as dx_26,
c.POA26,
case when c.diag26_qual is null and opdx86.dx is NOT null
THEN 'ABF'
else null
end diag26_qual,
c.ra26,
c.del_diag26,
opdx87.dx as dx_57,
c.POA27,
case when c.diag27_qual is null and opdx87.dx is NOT null
THEN 'ABF'
else null
end diag27_qual,
c.ra27,
c.del_diag27,
opdx88.dx as dx_58,
c.POA28,
case when c.diag28_qual is null and opdx88.dx is NOT null
THEN 'ABF'
else null
end diag28_qual,
c.ra28,
c.del_diag28,
opdx89.dx as dx_29,
c.POA29,
case when c.diag29_qual is null and opdx89.dx is NOT null
THEN 'ABF'
else null
end diag29_qual,
c.ra29,
c.del_diag29,
opdx90.dx as dx_30,
c.POA30,
case when c.diag30_qual is null and opdx90.dx is NOT null
THEN 'ABF'
else null
end diag30_qual,
c.ra30,
c.del_diag30,
c.option_ind_1,
c.option_ind_2,
c.option_ind_3,
c.option_ind_4,
c.option_ind_5,
c.option_ind_6,
c.option_ind_7,
c.option_ind_8,
c.option_ind_9,
c.option_ind_10,
c.End_of_Rec
from cohert c
    left join aetna_iP_DX_query opdx61 on opdx61.encounter_id = c.encounter_id      
                       and opdx61.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx61.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx61.cpt_CODE = c.cpt_CODE
                        and  opdx61.line = 61   
   left join aetna_iP_DX_query opdx62 on opdx62.encounter_id = c.encounter_id      
                       and opdx62.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx62.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx62.cpt_CODE = c.cpt_CODE
                        and  opdx62.line = 62   
   left join aetna_iP_DX_query opdx63 on opdx63.encounter_id = c.encounter_id      
                       and opdx63.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx63.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx63.cpt_CODE = c.cpt_CODE
                        and  opdx63.line = 63   
   left join aetna_iP_DX_query opdx64 on opdx64.encounter_id = c.encounter_id      
                       and opdx64.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx64.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx64.cpt_CODE = c.cpt_CODE
                        and  opdx64.line = 64   
   left join aetna_iP_DX_query opdx65 on opdx65.encounter_id = c.encounter_id      
                       and opdx65.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx65.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx65.cpt_CODE = c.cpt_CODE
                        and  opdx65.line = 65  
 left join aetna_iP_DX_query opdx66 on opdx66.encounter_id = c.encounter_id      
                       and opdx66.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx66.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx66.cpt_CODE = c.cpt_CODE
                        and  opdx66.line = 66   
 left join aetna_iP_DX_query opdx67 on opdx67.encounter_id = c.encounter_id      
                       and opdx67.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx67.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx67.cpt_CODE = c.cpt_CODE
                        and  opdx67.line = 67   
 left join aetna_iP_DX_query opdx68 on opdx68.encounter_id = c.encounter_id      
                       and opdx68.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx68.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx68.cpt_CODE = c.cpt_CODE
                        and  opdx68.line = 68   
 left join aetna_iP_DX_query opdx69 on opdx69.encounter_id = c.encounter_id      
                       and opdx69.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx69.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx69.cpt_CODE = c.cpt_CODE
                        and  opdx69.line = 69   
 left join aetna_iP_DX_query opdx70 on opdx70.encounter_id = c.encounter_id      
                       and opdx70.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx70.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx70.cpt_CODE = c.cpt_CODE
                        and  opdx70.line = 70 
left join aetna_iP_DX_query opdx71 on opdx71.encounter_id = c.encounter_id      
                       and opdx71.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx71.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx71.cpt_CODE = c.cpt_CODE
                        and  opdx71.line = 71 
 left join aetna_iP_DX_query opdx72 on opdx72.encounter_id = c.encounter_id      
                       and opdx72.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx72.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx72.cpt_CODE = c.cpt_CODE
                       and  opdx72.line = 72
left join aetna_iP_DX_query opdx73 on opdx73.encounter_id = c.encounter_id      
                       and opdx73.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx73.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx73.cpt_CODE = c.cpt_CODE
                        and  opdx73.line = 73 
 left join aetna_iP_DX_query opdx74 on opdx74.encounter_id = c.encounter_id      
                       and opdx74.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx74.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx74.cpt_CODE = c.cpt_CODE
                        and  opdx74.line = 74    
 left join aetna_iP_DX_query opdx75 on opdx75.encounter_id = c.encounter_id      
                       and opdx75.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx75.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx75.cpt_CODE = c.cpt_CODE
                        and  opdx75.line = 75 
  left join aetna_iP_DX_query opdx76 on opdx76.encounter_id = c.encounter_id      
                       and opdx76.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx76.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx76.cpt_CODE = c.cpt_CODE
                        and  opdx76.line = 76                       
 left join aetna_iP_DX_query opdx77 on opdx77.encounter_id = c.encounter_id      
                       and opdx77.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx77.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx77.cpt_CODE = c.cpt_CODE
                        and  opdx77.line = 77 
left join aetna_iP_DX_query opdx78 on opdx78.encounter_id = c.encounter_id      
                       and opdx78.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx78.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx78.cpt_CODE = c.cpt_CODE
                        and  opdx78.line = 78 
left join aetna_iP_DX_query opdx79 on opdx79.encounter_id = c.encounter_id      
                       and opdx79.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx79.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx79.cpt_CODE = c.cpt_CODE
                        and  opdx79.line = 79                         
left join aetna_iP_DX_query opdx80 on opdx80.encounter_id = c.encounter_id      
                       and opdx80.Date_of_Service_From = c.Date_of_Service_From                                                    
                       and  opdx80.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx80.cpt_CODE = c.cpt_CODE
                        and  opdx80.line = 80                         
left join aetna_iP_DX_query opdx81 on opdx81.encounter_id = c.encounter_id      
                       and opdx81.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx81.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx81.cpt_CODE = c.cpt_CODE
                        and  opdx81.line = 81 
left join aetna_iP_DX_query opdx82 on opdx82.encounter_id = c.encounter_id      
                       and opdx82.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx82.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx82.cpt_CODE = c.cpt_CODE
                        and  opdx82.line = 82                         
left join aetna_iP_DX_query opdx83 on opdx83.encounter_id = c.encounter_id      
                       and opdx83.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx83.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx83.cpt_CODE = c.cpt_CODE
                        and  opdx83.line = 83 
left join aetna_iP_DX_query opdx84 on opdx84.encounter_id = c.encounter_id      
                       and opdx84.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx84.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx84.cpt_CODE = c.cpt_CODE
                        and  opdx84.line = 84                         
left join aetna_iP_DX_query opdx85 on opdx85.encounter_id = c.encounter_id      
                       and opdx85.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx85.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx85.cpt_CODE = c.cpt_CODE
                        and  opdx85.line = 85                                             
 left join aetna_iP_DX_query opdx86 on opdx86.encounter_id = c.encounter_id      
                       and opdx86.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx86.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx86.cpt_CODE = c.cpt_CODE
                        and  opdx86.line = 86                       
left join aetna_iP_DX_query opdx87 on opdx87.encounter_id = c.encounter_id      
                       and opdx87.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx87.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx86.cpt_CODE = c.cpt_CODE
                        and  opdx87.line = 87                        
left join aetna_iP_DX_query opdx88 on opdx88.encounter_id = c.encounter_id      
                       and opdx88.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx88.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx88.cpt_CODE = c.cpt_CODE
                        and  opdx88.line = 88                       
 left join aetna_iP_DX_query opdx89 on opdx89.encounter_id = c.encounter_id      
                       and opdx89.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx89.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx89.cpt_CODE = c.cpt_CODE
                        and  opdx89.line = 89                       
 left join aetna_iP_DX_query opdx90 on opdx90.encounter_id = c.encounter_id      
                       and opdx90.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx90.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx90.cpt_CODE = c.cpt_CODE
                        and  opdx90.line = 90   