--drop table Anthem_main_query;

create table Anthem_main_query as
select
 ha.hsp_account_id  as "REF#",
'MHSC' as Vendor_Name,   --'MRCYMO' EAST --'MHSC' SGF
to_char(sysdate,'YYYYMMDD') as Sent_Date,
'I' as Claim_Type,
'10' as ICD_Level,
ha.hsp_account_id as Encounter_ID,
--ha.hsp_account_id|| row_number()over (order by ha.hsp_account_id asc) as Encounter_ID,
cast(null as number)as Risk_Assessment_Code,
substr(cvg.subscr_num,4,9) as Member_ID_Health_Plan,
regexp_replace(regexp_replace(cvg.medicare_subscr_id,'[- ]',''), '^(([0-9]{9}[a-z][0-9a-z]?)$|([a-z]{1,3}[0-9]{6})$|([a-z]{1,3}[0-9]{9})$|
  ([0-9][a-z][0-9a-z][0-9][a-z][0-9a-z][0-9][a-z]{2}[0-9]{2}$)|.*)','\2\3\4\5',1,0,'i')   as Member_ID_CMS_HICN,
cast(null as number)as Member_Site_Number,
pat.pat_last_name as Member_Name_Last,
pat.pat_first_name as Member_Name_First,
to_char(pat.birth_date,'MM/DD/YYYY') as Member_Date_of_Birth,
case 
when pat.sex_c = 1 then 'F'
when pat.sex_c = 2 then 'M'
else pat.sex_c
end as Member_Gender,
'Anthem' as Health_Plan_Name,
--'Anthem BLUE CROSS BLUE SHIELD' as Health_Plan_Name,
LOC.LOC_NAME as Provider_Name_Last_Facility_Name,
cast(null as number) as Provider_Name_First,
cv.bil_prov_npi as Provider_NPI,
cv.bil_prov_taxid as Provider_Tax_ID,
cast(null as number) as Provider_ID_Statutory,
cv.bil_prov_npi as Provider_ID_Internal,
cast(null as number) as  Provider_Specialty,
case 
when ha.acct_basecls_ha_c = 1 then '111' 
else '131' 
end as  Type_of_Bill,
to_char(ha.adm_date_time, 'mm/dd/yyyy') AS Date_of_Service_From,
to_char(ha.disch_date_time, 'mm/dd/yyyy') AS Date_of_Service_Thru,
'U' as Diagnosis_Code_Primary_POA,
replace(edgprim.current_icd10_list,'.','') as Diagnosis_Code_Admitting,
cast(null as number) AS Diagnosis_Code_Reason_for_Visit1,
cast(null as number) AS Diagnosis_Code_Reason_for_Visit2,
cast(null as number) AS Diagnosis_Code_Reason_for_Visit3,
cast(null as number) AS Diagnosis_Code_E_Code1,
cast(null as number) AS Diagnosis_Code_E_Code2,
cast(null as number) AS Diagnosis_Code_E_Code3,
cast(null as number) AS Diagnosis_Code_E_Code4,
cast(null as number) AS Diagnosis_Code_E_Code5,
cast(null as number) AS Diagnosis_Code_E_Code6,
cast(null as number) AS Diagnosis_Code_E_Code7,
cast(null as number) AS Diagnosis_Code_E_Code8,
cast(null as number) AS Diagnosis_Code_E_Code9,
cast(null as number) AS Diagnosis_Code_E_Code10,
cast(null as number) AS Diagnosis_Code_E_Code11,
cast(null as number) AS Diagnosis_Code_E_Code12,
cast(null as number) AS Diagnosis_Code_E_Code1_POA,
cast(null as number) AS Diagnosis_Code_E_Code2_POA,
cast(null as number) AS Diagnosis_Code_E_Code3_POA,
cast(null as number) AS Diagnosis_Code_E_Code4_POA,
cast(null as number) AS Diagnosis_Code_E_Code5_POA,
cast(null as number) AS Diagnosis_Code_E_Code6_POA,
cast(null as number) AS Diagnosis_Code_E_Code7_POA,
cast(null as number) AS Diagnosis_Code_E_Code8_POA,
cast(null as number) AS Diagnosis_Code_E_Code9_POA,
cast(null as number) AS Diagnosis_Code_E_Code10_POA,
cast(null as number) AS Diagnosis_Code_E_Code11_POA,
cast(null as number) AS Diagnosis_Code_E_Code12_POA,
cast(null as number) AS Diagnosis_Code_Other1_POA,
cast(null as number) AS Diagnosis_Code_Other2_POA,
cast(null as number) AS Diagnosis_Code_Other3_POA,
cast(null as number) AS Diagnosis_Code_Other4_POA,
cast(null as number) AS Diagnosis_Code_Other5_POA,
cast(null as number) AS Diagnosis_Code_Other6_POA,
cast(null as number) AS Diagnosis_Code_Other7_POA,
cast(null as number) AS Diagnosis_Code_Other8_POA,
cast(null as number) AS Diagnosis_Code_Other9_POA,
cast(null as number) AS Diagnosis_Code_Other10_POA,
cast(null as number) AS Diagnosis_Code_Other11_POA,
cast(null as number) AS Diagnosis_Code_Other12_POA,
cast(null as number) AS Diagnosis_Code_Other13_POA,
cast(null as number) AS Diagnosis_Code_Other14_POA,
cast(null as number) AS Diagnosis_Code_Other15_POA,
cast(null as number) AS Diagnosis_Code_Other16_POA,
cast(null as number) AS Diagnosis_Code_Other17_POA,
cast(null as number) AS Diagnosis_Code_Other18_POA,
cast(null as number) AS Diagnosis_Code_Other19_POA,
cast(null as number) AS Diagnosis_Code_Other20_POA,
cast(null as number) AS Diagnosis_Code_Other21_POA,
cast(null as number) AS Diagnosis_Code_Other22_POA,
cast(null as number) AS Diagnosis_Code_Other23_POA,
cast(null as number) AS Diagnosis_Code_Other24_POA,
SLI.LN_rev_CD as Revenue_Code,
cast(null as number) as Procedure_Code_Type,
cast(null as number) as procedure_Code,
cast(null as number)as Procedure_Modifier,
addr.addr_line_1 as Provider_Street_Address_1 , 
addr.addr_line_2 as Provider_Street_Address_2,
addr.city as Provider_City,
zs.abbr as Provider_State_Code, 
case 
when addr.zip is null then '123459998'
when substr(addr.zip ,6,9) is null then replace(addr.zip, '-','')||'9998'
else replace(addr.zip, '-','') 
end as Provider_Zip_Code ,
pat.add_line_1 AS Member_Street_Address_1,
Pat.add_line_2 AS Member_Street_Address_2,
pat.city  as Member_City,
st.abbr as Member_State_Code,
case 
when pat.zip is null then '123459998'
WHEN substr(pat.zip ,6,9) is null then replace(pat.zip, '-','')||'9998'
else replace(pat.zip, '-','') 
end Member_Zip_Code, 
'000' as Line_Charge,
'DA' as Line_Units_Type,
'1' as Line_Units,
cast(null as number) as Provider_Signature_on_File,	
'A' as Provider_Accepts_Assignment,	
'Y' as Benefits_Are_Assigned,
'I' as Release_of_Info_Ind,	
'2359' as Inpatient_Discharge_Time,	
'9' as Admission_Type_Code,
'9' as Admission_Source_Code,
cv2.dischrg_disp as Patient_Status_Code,
'000' as Patient_Amount_to_Pay,	
cast(null as number) as Service_Provided_on_Emergency_Basis,
'RRM8S' as Patient_Account_Number ---- RRM8S for MHSC(SGF)  'RRM3O' for 'MRCYMO'(EAST)
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
Join clarity.clarity_POS pos on loc.loc_id = pos.pos_id
left join zc_state zs on pos.state_c = zs.state_c
join clarity.clm_values_2 cv2 on cvr.record_id = cv2.record_id
left join bi_clarity.mv_ref_ser refser on  ha.attending_prov_id = refser.prov_id
left join clarity_ser ser on refser.prov_id = ser.prov_id 
left join clarity_ser_addr addr on ser.prov_id = addr.prov_id 
left join zc_state zs on addr.state_c = zs.state_c 
left outer join clarity.hsp_acct_admit_dx haad on haad.hsp_account_id = ha.hsp_account_id 
                                and haad.line = 1
left outer join clarity.clarity_edg edgprim on edgprim.dx_id = haad.admit_dx_id

where 1=1
and cvr.clm_typ_c = 2 ---- Institutional Claim 
--and sli.line = 1 
and bkt.bkt_sts_ha_c != 8  --rejected
and ser.enc_prov_YN = 'Y'
and addr.primary_addr_yn = 'Y'
and HCD.UB_THROUGH_DT >= '01-JAN-25'
and HCD.UB_THROUGH_DT < '01-JAN-26'
and HCD.SG_loc_id in (40006,--	PARENT MERCY ST FRANCIS HOSPITAL  ------------------sgf
40001,--	PARENT MERCY HOSPITAL SPRINGFIELD   
40002,--	PARENT MERCY HOSPITAL LEBANON   
40003,--	PARENT MERCY HOSPITAL AURORA   
40004,--	PARENT MERCY HOSPITAL BERRYVILLE   
40005, --	PARENT MERCY HOSPITAL CASSVILLE 
90003,  --PARENT MERCY HOSPITAL CARTHAGE
90001,   -- PARENT MERCY HOSPITAL JOPLIN
90002, --PARENT MERCY HOSPITAL PITTSBURG
90005,---- PARENT MERCY SPECIALTY HOSPITAL SOUTHEAST KANSAS
90004)  --PARENT MERCY MAUDE NORTON HOSPITAL COLUMBUS

--and HCD.SG_loc_id in (20001, --    PARENT MERCY HOSPITAL ST LOUIS  ------------east
--20002, --    PARENT MERCY HOSPITAL WASHINGTON   
--20004, --    PARENT MERCY HOSPITAL JEFFERSON  
--20006, --    PARENT MERCY HOSPITAL LINCOLN
-- 20007,   --PARENT MERCY HOSPITAL SOUTH
--20010,  --PARENT MERCY HOSPITAL PERRY
--20012)  --PARENT MERCY HOSPITAL SOUTHEAST

and HCD.SG_plan_id in (2004702, ----	BCBS MEDICARE HMO 
2004703, ----	BCBS MEDICARE PFFS 
2004704, ----	BCBS HEALTH ADV MEDIPAK ADV HMO H9699 MCR 
32004702, ----	BCBS MEDICARE HMO CONTRACTED 
32004703, ----	BCBS MEDICARE PFFS CONTRACTED 
32004704) ----	BCBS HEALTH ADV MEDIPAK ADV HMO H9699 MCR CONTRACTED 
and (cv.bill_typ_fac_cd in (11, 12, 18) or
(cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85) 
       )
       )
 and sli.line = 1
and (sli.ln_proc_cd in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2024)
     or sli.ln_proc_cd is null)



______________________________________________________________________________________________________________________________________________________________________________________
--DX Code query grabs all the DX codes from the anthem_IP_DX_query
--Always drop table first

--drop table anthem_IP_DX_query;


create table anthem_IP_DX_query as
select distinct 
main.ref#,
main.Date_of_Service_From,
main.Date_of_Service_Thru,
replace(edg.ref_bill_code,'.','')as dx,
hadx.line
from  Anthem_main_query main 
join hsp_acct_dx_list hadx on main.ref# = hadx.hsp_account_id
 join clarity_edg edg on hadx.dx_id = edg.dx_id
 where 1=1
 order by hadx.line
_______________________________________________________________________________________________________________________________________________________________________________________________________________________________

----Final ouput has the DX codes in the correct format up to 24 dx codes.


with cohert as(

select distinct 
OPDX.REF#,
Vendor_Name,
Sent_Date,
Claim_Type,
ICD_Level,
Encounter_id,
Risk_Assessment_Code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
Member_Gender,
Health_Plan_Name,
Provider_Name_Last_Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
Type_of_Bill,
OPDX.Date_of_Service_From,
opdx.Date_of_Service_Thru,
Diagnosis_Code_Primary_POA,
Diagnosis_Code_Admitting,
Diagnosis_Code_Reason_for_Visit1,
Diagnosis_Code_Reason_for_Visit2,
Diagnosis_Code_Reason_for_Visit3,
Diagnosis_Code_E_Code1,
Diagnosis_Code_E_Code2,
Diagnosis_Code_E_Code3,
Diagnosis_Code_E_Code4,
Diagnosis_Code_E_Code5,
Diagnosis_Code_E_Code6,
Diagnosis_Code_E_Code7,
Diagnosis_Code_E_Code8,
Diagnosis_Code_E_Code9,
Diagnosis_Code_E_Code10,
Diagnosis_Code_E_Code11,
Diagnosis_Code_E_Code12,
Diagnosis_Code_E_Code1_POA,
Diagnosis_Code_E_Code2_POA,
Diagnosis_Code_E_Code3_POA,
Diagnosis_Code_E_Code4_POA,
Diagnosis_Code_E_Code5_POA,
Diagnosis_Code_E_Code6_POA,
Diagnosis_Code_E_Code7_POA,
Diagnosis_Code_E_Code8_POA,
Diagnosis_Code_E_Code9_POA,
Diagnosis_Code_E_Code10_POA,
Diagnosis_Code_E_Code11_POA,
Diagnosis_Code_E_Code12_POA,
Diagnosis_Code_Other1_POA,
Diagnosis_Code_Other2_POA,
Diagnosis_Code_Other3_POA,
Diagnosis_Code_Other4_POA,
Diagnosis_Code_Other5_POA,
Diagnosis_Code_Other6_POA,
Diagnosis_Code_Other7_POA,
Diagnosis_Code_Other8_POA,
Diagnosis_Code_Other9_POA,
Diagnosis_Code_Other10_POA,
Diagnosis_Code_Other11_POA,
Diagnosis_Code_Other12_POA,
Diagnosis_Code_Other13_POA,
Diagnosis_Code_Other14_POA,
Diagnosis_Code_Other15_POA,
Diagnosis_Code_Other16_POA,
Diagnosis_Code_Other17_POA,
Diagnosis_Code_Other18_POA,
Diagnosis_Code_Other19_POA,
Diagnosis_Code_Other20_POA,
Diagnosis_Code_Other21_POA,
Diagnosis_Code_Other22_POA,
Diagnosis_Code_Other23_POA,
Diagnosis_Code_Other24_POA,
Revenue_Code,
Procedure_Code_Type,
procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1 , 
Provider_Street_Address_2,
Provider_City,
Provider_State_Code, 
Provider_Zip_Code ,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code, 
Line_Charge,
Line_Units_Type,
Line_Units,
Provider_Signature_on_File,	
Provider_Accepts_Assignment,	
Benefits_Are_Assigned,
Release_of_Info_Ind,	
Inpatient_Discharge_Time,	
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
Patient_Amount_to_Pay,	
Service_Provided_on_Emergency_Basis,
Patient_Account_Number 
 from
 anthem_IP_DX_query opdx
 join Anthem_main_query main on main.ref# = opdx.ref#

 where 1=1
 --and encounter_id = '2072001499771'
) 
select distinct 
c.REF#,
c.Vendor_Name,
c.Sent_Date,
c.Claim_Type,
c.ICD_Level,
c.Encounter_id,
c.Risk_Assessment_Code,
c.Member_ID_Health_Plan,
c.Member_ID_CMS_HICN,
c.Member_Site_Number,
c.Member_Name_Last,
c.Member_Name_First,
c.Member_date_of_birth,
c.Member_Gender,
c.Health_Plan_Name, 
c.Provider_Name_Last_Facility_Name,
c.Provider_Name_First,
c.Provider_NPI,
c.Provider_Tax_ID,
c.Provider_ID_Statutory,
c.Provider_ID_Internal,
c.Provider_Specialty,
c.Type_of_Bill,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
opdxp.dx as Diagnosis_Code_Primary,
c.Diagnosis_Code_Primary_POA,
c.DIAGNOSIS_CODE_ADMITTING,
c.Diagnosis_Code_Reason_for_Visit1,
c.Diagnosis_Code_Reason_for_Visit2,
c.Diagnosis_Code_Reason_for_Visit3,
c.Diagnosis_Code_E_Code1,
c.Diagnosis_Code_E_Code2,
c.Diagnosis_Code_E_Code3,
c.Diagnosis_Code_E_Code4,
c.Diagnosis_Code_E_Code5,
c.Diagnosis_Code_E_Code6,
c.Diagnosis_Code_E_Code7,
c.Diagnosis_Code_E_Code8,
c.Diagnosis_Code_E_Code9,
c.Diagnosis_Code_E_Code10,
c.Diagnosis_Code_E_Code11,
c.Diagnosis_Code_E_Code12,
c.Diagnosis_Code_E_Code1_POA,
c.Diagnosis_Code_E_Code2_POA,
c.Diagnosis_Code_E_Code3_POA,
c.Diagnosis_Code_E_Code4_POA,
c.Diagnosis_Code_E_Code5_POA,
c.Diagnosis_Code_E_Code6_POA,
c.Diagnosis_Code_E_Code7_POA,
c.Diagnosis_Code_E_Code8_POA,
c.Diagnosis_Code_E_Code9_POA,
c.Diagnosis_Code_E_Code10_POA,
c.Diagnosis_Code_E_Code11_POA,
c.Diagnosis_Code_E_Code12_POA,
opdx1.dx as Diagnosis_Code_Other1,
opdx2.dx as Diagnosis_Code_Other2,
opdx3.dx as Diagnosis_Code_Other3,
opdx4.dx as Diagnosis_Code_Other4,
opdx5.dx as Diagnosis_Code_Other5,
opdx6.dx as Diagnosis_Code_Other6,
opdx7.dx as Diagnosis_Code_Other7,
opdx8.dx as Diagnosis_Code_Other8,
opdx9.dx as Diagnosis_Code_Other9,
opdx10.dx as Diagnosis_Code_Other10,
opdx11.dx as Diagnosis_Code_Other11,
opdx12.dx as Diagnosis_Code_Other12,
opdx13.dx as Diagnosis_Code_Other13,
opdx14.dx as Diagnosis_Code_Other14,
opdx15.dx as Diagnosis_Code_Other15,
opdx16.dx as Diagnosis_Code_Other16,
opdx17.dx as Diagnosis_Code_Other17,
opdx18.dx as Diagnosis_Code_Other18,
opdx19.dx as Diagnosis_Code_Other19,
opdx20.dx as Diagnosis_Code_Other20,
opdx21.dx as Diagnosis_Code_Other21,
opdx22.dx as Diagnosis_Code_Other22,
opdx23.dx as Diagnosis_Code_Other23,
opdx24.dx as Diagnosis_Code_Other24,
case when c.Diagnosis_Code_Other1_POA is null and opdx1.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other1_POA,
case when c.Diagnosis_Code_Other2_POA is null and opdx2.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other2_POA,
case when c.Diagnosis_Code_Other3_POA is null and opdx3.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other3_POA,
case when c.Diagnosis_Code_Other4_POA is null and opdx4.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other4_POA,
case when c.Diagnosis_Code_Other5_POA is null and opdx5.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other5_POA,
case when c.Diagnosis_Code_Other6_POA is null and opdx6.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other6_POA,
case when c.Diagnosis_Code_Other7_POA is null and opdx7.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other7_POA,
case when c.Diagnosis_Code_Other8_POA is null and opdx8.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other8_POA,
case when c.Diagnosis_Code_Other9_POA is null and opdx9.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other9_POA,
case when c.Diagnosis_Code_Other10_POA is null and opdx10.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other10_POA,
case when c.Diagnosis_Code_Other11_POA is null and opdx11.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other11_POA,
case when c.Diagnosis_Code_Other12_POA is null and opdx12.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other12_POA,
case when c.Diagnosis_Code_Other13_POA is null and opdx13.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other13_POA,
case when c.Diagnosis_Code_Other14_POA is null and opdx14.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other14_POA,
case when c.Diagnosis_Code_Other15_POA is null and opdx15.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other15_POA,
case when c.Diagnosis_Code_Other16_POA is null and opdx16.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other16_POA,
case when c.Diagnosis_Code_Other17_POA is null and opdx17.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other17_POA,
case when c.Diagnosis_Code_Other18_POA is null and opdx18.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other18_POA,
case when c.Diagnosis_Code_Other19_POA is null and opdx19.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other19_POA,
case when c.Diagnosis_Code_Other20_POA is null and opdx20.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other20_POA,
case when c.Diagnosis_Code_Other21_POA is null and opdx21.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other21_POA,
case when c.Diagnosis_Code_Other22_POA is null and opdx22.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other22_POA,
case when c.Diagnosis_Code_Other23_POA is null and opdx23.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other23_POA,
case when c.Diagnosis_Code_Other24_POA is null and opdx24.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other24_POA,
c.Revenue_Code,
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_State_Code,
c.Provider_zip_code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.Line_Charge,
c. Line_Units_Type,
c. Line_Units,
c.Provider_Signature_on_File,
c.Provider_Accepts_Assignment,
c.Benefits_Are_Assigned,
c.Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
c.Patient_Amount_to_Pay,
c.Service_Provided_on_Emergency_Basis,
c.patient_account_number
      from cohert c
      left join anthem_IP_DX_query opdxp on opdxp.ref# = c.ref#      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
  left join anthem_IP_DX_query opdx1 on opdx1.ref# = c.ref#      
                       and opdx1.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx1.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx1.Procedure_Code = c.Procedure_Code
                        and  opdx1.line = 1                   
   left join anthem_IP_DX_query opdx2 on opdx2.ref# = c.ref#      
                       and opdx2.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx2.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx2.Procedure_Code = c.Procedure_Code
                        and  opdx2.line = 2                                     
   left join anthem_IP_DX_query opdx3 on opdx3.ref# = c.ref#      
                       and opdx3.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx3.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx3.Procedure_Code = c.Procedure_Code
                        and  opdx3.line = 3   
    left join anthem_IP_DX_query opdx4 on opdx4.ref# = c.ref#      
                       and opdx4.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx4.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx4.Procedure_Code = c.Procedure_Code
                        and  opdx4.line = 4   
   left join anthem_IP_DX_query opdx5 on opdx5.ref# = c.ref#      
                       and opdx5.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx5.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx5.Procedure_Code = c.Procedure_Code
                        and  opdx5.line = 5   
   left join anthem_IP_DX_query opdx6 on opdx6.ref# = c.ref#      
                       and opdx6.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx6.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx6.Procedure_Code = c.Procedure_Code
                        and  opdx6.line = 6   
   left join anthem_IP_DX_query opdx7 on opdx7.ref# = c.ref#      
                       and opdx7.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx7.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx7.Procedure_Code = c.Procedure_Code
                        and  opdx7.line = 7   
   left join anthem_IP_DX_query opdx8 on opdx8.ref# = c.ref#      
                       and opdx8.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx8.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx8.Procedure_Code = c.Procedure_Code
                        and  opdx8.line = 8   
   left join anthem_IP_DX_query opdx9 on opdx9.ref# = c.ref#      
                       and opdx9.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx9.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx9.Procedure_Code = c.Procedure_Code
                        and  opdx9.line = 9   
   left join anthem_IP_DX_query opdx10 on opdx10.ref# = c.ref#      
                       and opdx10.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx10.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx10.Procedure_Code = c.Procedure_Code
                        and  opdx10.line = 10   
   left join anthem_IP_DX_query opdx11 on opdx11.ref# = c.ref#      
                       and opdx11.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx11.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx11.Procedure_Code = c.Procedure_Code
                        and  opdx11.line = 11   
   left join anthem_IP_DX_query opdx12 on opdx12.ref# = c.ref#      
                       and opdx12.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx12.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx12.Procedure_Code = c.Procedure_Code
                        and  opdx12.line = 12   
   left join anthem_IP_DX_query opdx13 on opdx13.ref# = c.ref#      
                       and opdx13.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx13.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx13.Procedure_Code = c.Procedure_Code
                        and  opdx13.line = 13   
   left join anthem_IP_DX_query opdx14 on opdx14.ref# = c.ref#      
                       and opdx14.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx14.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx14.Procedure_Code = c.Procedure_Code
                       and  opdx14.line = 14   
   left join anthem_IP_DX_query opdx15 on opdx15.ref# = c.ref#      
                       and opdx15.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx15.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx15.Procedure_Code = c.Procedure_Code
                        and  opdx15.line = 15   
   left join anthem_IP_DX_query opdx16 on opdx16.ref# = c.ref#      
                       and opdx16.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx16.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx16.Procedure_Code = c.Procedure_Code
                        and  opdx16.line = 16   
    left join anthem_IP_DX_query opdx17 on opdx17.ref# = c.ref#      
                       and opdx17.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx17.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx17.Procedure_Code = c.Procedure_Code
                        and  opdx17.line = 17   
   left join anthem_IP_DX_query opdx18 on opdx18.ref# = c.ref#      
                       and opdx18.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx18.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx18.Procedure_Code = c.Procedure_Code
                        and  opdx18.line = 18   
   left join anthem_IP_DX_query opdx19 on opdx19.ref# = c.ref#      
                       and opdx19.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx19.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx19.Procedure_Code = c.Procedure_Code
                        and  opdx19.line = 19   
   left join anthem_IP_DX_query opdx20 on opdx20.ref# = c.ref#      
                       and opdx20.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx20.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx20.Procedure_Code = c.Procedure_Code
                        and  opdx20.line = 20   
   left join anthem_IP_DX_query opdx21 on opdx21.ref# = c.ref#      
                       and opdx21.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx21.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx21.Procedure_Code = c.Procedure_Code
                        and  opdx21.line = 21   
   left join anthem_IP_DX_query opdx22 on opdx22.ref# = c.ref#      
                       and opdx22.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx22.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx22.Procedure_Code = c.Procedure_Code
                        and  opdx22.line = 22   
   left join anthem_IP_DX_query opdx23 on opdx23.ref# = c.ref#      
                       and opdx23.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx23.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx23.Procedure_Code = c.Procedure_Code
                        and  opdx23.line = 23   
   left join anthem_IP_DX_query opdx24 on opdx24.ref# = c.ref#      
                       and opdx24.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx24.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx24.Procedure_Code = c.Procedure_Code
                        and  opdx24.line = 24   
_______________________________________________________________________________________________________________________________________________________________________________________________________________________________
---Final ouput has the DX codes in the correct format up to 25-48 dx codes.

with cohert as(

select distinct 
OPDX.REF#,
Vendor_Name,
Sent_Date,
Claim_Type,
ICD_Level,
Encounter_ID,
Risk_Assessment_Code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
Member_Gender,
Health_Plan_Name,
Provider_Name_Last_Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
Type_of_Bill,
OPDX.Date_of_Service_From,
opdx.Date_of_Service_Thru,
Diagnosis_Code_Primary_POA,
Diagnosis_Code_Admitting,
Diagnosis_Code_Reason_for_Visit1,
Diagnosis_Code_Reason_for_Visit2,
Diagnosis_Code_Reason_for_Visit3,
Diagnosis_Code_E_Code1,
Diagnosis_Code_E_Code2,
Diagnosis_Code_E_Code3,
Diagnosis_Code_E_Code4,
Diagnosis_Code_E_Code5,
Diagnosis_Code_E_Code6,
Diagnosis_Code_E_Code7,
Diagnosis_Code_E_Code8,
Diagnosis_Code_E_Code9,
Diagnosis_Code_E_Code10,
Diagnosis_Code_E_Code11,
Diagnosis_Code_E_Code12,
Diagnosis_Code_E_Code1_POA,
Diagnosis_Code_E_Code2_POA,
Diagnosis_Code_E_Code3_POA,
Diagnosis_Code_E_Code4_POA,
Diagnosis_Code_E_Code5_POA,
Diagnosis_Code_E_Code6_POA,
Diagnosis_Code_E_Code7_POA,
Diagnosis_Code_E_Code8_POA,
Diagnosis_Code_E_Code9_POA,
Diagnosis_Code_E_Code10_POA,
Diagnosis_Code_E_Code11_POA,
Diagnosis_Code_E_Code12_POA,
Diagnosis_Code_Other1_POA,
Diagnosis_Code_Other2_POA,
Diagnosis_Code_Other3_POA,
Diagnosis_Code_Other4_POA,
Diagnosis_Code_Other5_POA,
Diagnosis_Code_Other6_POA,
Diagnosis_Code_Other7_POA,
Diagnosis_Code_Other8_POA,
Diagnosis_Code_Other9_POA,
Diagnosis_Code_Other10_POA,
Diagnosis_Code_Other11_POA,
Diagnosis_Code_Other12_POA,
Diagnosis_Code_Other13_POA,
Diagnosis_Code_Other14_POA,
Diagnosis_Code_Other15_POA,
Diagnosis_Code_Other16_POA,
Diagnosis_Code_Other17_POA,
Diagnosis_Code_Other18_POA,
Diagnosis_Code_Other19_POA,
Diagnosis_Code_Other20_POA,
Diagnosis_Code_Other21_POA,
Diagnosis_Code_Other22_POA,
Diagnosis_Code_Other23_POA,
Diagnosis_Code_Other24_POA,
Revenue_Code,
Procedure_Code_Type,
procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1 , 
Provider_Street_Address_2,
Provider_City,
Provider_State_Code, 
Provider_Zip_Code ,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code, 
Line_Charge,
Line_Units_Type,
Line_Units,
Provider_Signature_on_File,	
Provider_Accepts_Assignment,	
Benefits_Are_Assigned,
Release_of_Info_Ind,	
Inpatient_Discharge_Time,	
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
Patient_Amount_to_Pay,	
Service_Provided_on_Emergency_Basis,
Patient_Account_Number 
 from
 anthem_IP_DX_query opdx
 join Anthem_main_query main on main.ref# = opdx.ref#

 where 1=1
 and opdx.line > 24
--and encounter_id = '2072004409541840'
)
select distinct 
c.REF#,
c.Vendor_Name,
c.Sent_Date,
c.Claim_Type,
c.ICD_Level,
c.Encounter_ID,
c.Risk_Assessment_Code,
c.Member_ID_Health_Plan,
c.Member_ID_CMS_HICN,
c.Member_Site_Number,
c.Member_Name_Last,
c.Member_Name_First,
c.Member_date_of_birth,
c.Member_Gender,
c.Health_Plan_Name, 
c.Provider_Name_Last_Facility_Name,
c.Provider_Name_First,
c.Provider_NPI,
c.Provider_Tax_ID,
c.Provider_ID_Statutory,
c.Provider_ID_Internal,
c.Provider_Specialty,
c.Type_of_Bill,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
opdxp.dx as Diagnosis_Code_Primary,
c.Diagnosis_Code_Primary_POA,
c.DIAGNOSIS_CODE_ADMITTING,
c.Diagnosis_Code_Reason_for_Visit1,
c.Diagnosis_Code_Reason_for_Visit2,
c.Diagnosis_Code_Reason_for_Visit3,
c.Diagnosis_Code_E_Code1,
c.Diagnosis_Code_E_Code2,
c.Diagnosis_Code_E_Code3,
c.Diagnosis_Code_E_Code4,
c.Diagnosis_Code_E_Code5,
c.Diagnosis_Code_E_Code6,
c.Diagnosis_Code_E_Code7,
c.Diagnosis_Code_E_Code8,
c.Diagnosis_Code_E_Code9,
c.Diagnosis_Code_E_Code10,
c.Diagnosis_Code_E_Code11,
c.Diagnosis_Code_E_Code12,
c.Diagnosis_Code_E_Code1_POA,
c.Diagnosis_Code_E_Code2_POA,
c.Diagnosis_Code_E_Code3_POA,
c.Diagnosis_Code_E_Code4_POA,
c.Diagnosis_Code_E_Code5_POA,
c.Diagnosis_Code_E_Code6_POA,
c.Diagnosis_Code_E_Code7_POA,
c.Diagnosis_Code_E_Code8_POA,
c.Diagnosis_Code_E_Code9_POA,
c.Diagnosis_Code_E_Code10_POA,
c.Diagnosis_Code_E_Code11_POA,
c.Diagnosis_Code_E_Code12_POA,
opdx25.dx as Diagnosis_Code_Other1,
opdx26.dx as Diagnosis_Code_Other2,
opdx27.dx as Diagnosis_Code_Other3,
opdx28.dx as Diagnosis_Code_Other4,
opdx29.dx as Diagnosis_Code_Other5,
opdx30.dx as Diagnosis_Code_Other6,
opdx31.dx as Diagnosis_Code_Other7,
opdx32.dx as Diagnosis_Code_Other8,
opdx33.dx as Diagnosis_Code_Other9,
opdx34.dx as Diagnosis_Code_Other10,
opdx35.dx as Diagnosis_Code_Other11,
opdx36.dx as Diagnosis_Code_Other12,
opdx37.dx as Diagnosis_Code_Other13,
opdx38.dx as Diagnosis_Code_Other14,
opdx39.dx as Diagnosis_Code_Other15,
opdx40.dx as Diagnosis_Code_Other16,
opdx41.dx as Diagnosis_Code_Other17,
opdx42.dx as Diagnosis_Code_Other18,
opdx43.dx as Diagnosis_Code_Other19,
opdx44.dx as Diagnosis_Code_Other20,
opdx45.dx as Diagnosis_Code_Other21,
opdx46.dx as Diagnosis_Code_Other22,
opdx47.dx as Diagnosis_Code_Other23,
opdx48.dx as Diagnosis_Code_Other24,
case when c.Diagnosis_Code_Other1_POA is null and opdx25.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other1_POA,
case when c.Diagnosis_Code_Other2_POA is null and opdx26.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other2_POA,
case when c.Diagnosis_Code_Other3_POA is null and opdx27.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other3_POA,
case when c.Diagnosis_Code_Other4_POA is null and opdx28.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other4_POA,
case when c.Diagnosis_Code_Other5_POA is null and opdx29.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other5_POA,
case when c.Diagnosis_Code_Other6_POA is null and opdx30.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other6_POA,
case when c.Diagnosis_Code_Other7_POA is null and opdx31.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other7_POA,
case when c.Diagnosis_Code_Other8_POA is null and opdx32.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other8_POA,
case when c.Diagnosis_Code_Other9_POA is null and opdx33.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other9_POA,
case when c.Diagnosis_Code_Other10_POA is null and opdx34.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other10_POA,
case when c.Diagnosis_Code_Other11_POA is null and opdx35.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other11_POA,
case when c.Diagnosis_Code_Other12_POA is null and opdx36.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other12_POA,
case when c.Diagnosis_Code_Other13_POA is null and opdx37.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other13_POA,
case when c.Diagnosis_Code_Other14_POA is null and opdx38.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other14_POA,
case when c.Diagnosis_Code_Other15_POA is null and opdx39.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other15_POA,
case when c.Diagnosis_Code_Other16_POA is null and opdx40.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other16_POA,
case when c.Diagnosis_Code_Other17_POA is null and opdx41.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other17_POA,
case when c.Diagnosis_Code_Other18_POA is null and opdx42.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other18_POA,
case when c.Diagnosis_Code_Other19_POA is null and opdx43.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other19_POA,
case when c.Diagnosis_Code_Other20_POA is null and opdx44.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other20_POA,
case when c.Diagnosis_Code_Other21_POA is null and opdx45.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other21_POA,
case when c.Diagnosis_Code_Other22_POA is null and opdx46.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other22_POA,
case when c.Diagnosis_Code_Other23_POA is null and opdx47.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other23_POA,
case when c.Diagnosis_Code_Other24_POA is null and opdx48.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other24_POA,
c.Revenue_Code,
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_State_Code,
c.Provider_zip_code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.Line_Charge,
c. Line_Units_Type,
c. Line_Units,
c.Provider_Signature_on_File,
c.Provider_Accepts_Assignment,
c.Benefits_Are_Assigned,
c.Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
c.Patient_Amount_to_Pay,
c.Service_Provided_on_Emergency_Basis,
c.patient_account_number
      from cohert c
      left join anthem_IP_DX_query opdxp on opdxp.ref# = c.ref#      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
   left join anthem_IP_DX_query opdx25 on opdx25.ref# = c.ref#      
                       and opdx25.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx25.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx25.Procedure_Code = c.Procedure_Code
                        and  opdx25.line = 25  
     left join anthem_IP_DX_query opdx26 on opdx26.ref# = c.ref#      
                       and opdx26.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx26.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx26.Procedure_Code = c.Procedure_Code
                        and  opdx26.line = 26 
   left join anthem_IP_DX_query opdx27 on opdx27.ref# = c.ref#      
                       and opdx27.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx27.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx27.Procedure_Code = c.Procedure_Code
                        and  opdx27.line = 27   
   left join anthem_IP_DX_query opdx28 on opdx28.ref# = c.ref#      
                       and opdx28.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx28.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx28.Procedure_Code = c.Procedure_Code
                        and  opdx28.line = 28   
   left join anthem_IP_DX_query opdx29 on opdx29.ref# = c.ref#      
                       and opdx29.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx29.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx29.Procedure_Code = c.Procedure_Code
                        and  opdx29.line = 29   
   left join anthem_IP_DX_query opdx30 on opdx30.ref# = c.ref#      
                       and opdx30.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx30.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx30.Procedure_Code = c.Procedure_Code
                        and  opdx30.line = 30   
   left join anthem_IP_DX_query opdx31 on opdx31.ref# = c.ref#      
                       and opdx31.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx31.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx31.Procedure_Code = c.Procedure_Code
                        and  opdx31.line = 31   
   left join anthem_IP_DX_query opdx32 on opdx32.ref# = c.ref#      
                       and opdx32.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx32.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx32.Procedure_Code = c.Procedure_Code
                        and  opdx32.line = 32   
   left join anthem_IP_DX_query opdx33 on opdx33.ref# = c.ref#      
                       and opdx33.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx33.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx33.Procedure_Code = c.Procedure_Code
                        and  opdx33.line = 33   
   left join anthem_IP_DX_query opdx34 on opdx34.ref# = c.ref#      
                       and opdx34.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx34.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx34.Procedure_Code = c.Procedure_Code
                        and  opdx34.line = 34   
   left join anthem_IP_DX_query opdx35 on opdx35.ref# = c.ref#      
                       and opdx35.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx35.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx35.Procedure_Code = c.Procedure_Code
                        and  opdx35.line = 35  
 left join anthem_IP_DX_query opdx36 on opdx36.ref# = c.ref#      
                       and opdx36.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx36.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx36.Procedure_Code = c.Procedure_Code
                        and  opdx36.line = 36   
 left join anthem_IP_DX_query opdx37 on opdx37.ref# = c.ref#      
                       and opdx37.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx37.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx37.Procedure_Code = c.Procedure_Code
                        and  opdx37.line = 37   
 left join anthem_IP_DX_query opdx38 on opdx38.ref# = c.ref#      
                       and opdx38.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx38.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx38.Procedure_Code = c.Procedure_Code
                        and  opdx38.line = 38   
 left join anthem_IP_DX_query opdx39 on opdx39.ref# = c.ref#      
                       and opdx39.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx39.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx39.Procedure_Code = c.Procedure_Code
                        and  opdx39.line = 39   
 left join anthem_IP_DX_query opdx40 on opdx40.ref# = c.ref#      
                       and opdx40.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx40.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx40.line = 40 
left join anthem_IP_DX_query opdx41 on opdx41.ref# = c.ref#      
                       and opdx41.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx41.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx41.line = 41 
left join anthem_IP_DX_query opdx42 on opdx42.ref# = c.ref#      
                       and opdx42.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx42.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx42.line = 42 
left join anthem_IP_DX_query opdx43 on opdx43.ref# = c.ref#      
                       and opdx43.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx43.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx43.line = 43 
left join anthem_IP_DX_query opdx44 on opdx44.ref# = c.ref#      
                       and opdx44.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx44.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx44.line = 44 
left join anthem_IP_DX_query opdx45 on opdx45.ref# = c.ref#      
                       and opdx45.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx45.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx45.line = 45 
left join anthem_IP_DX_query opdx46 on opdx46.ref# = c.ref#      
                       and opdx46.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx46.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx46.line = 46 
left join anthem_IP_DX_query opdx47 on opdx47.ref# = c.ref#      
                       and opdx47.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx47.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx47.line = 47
left join anthem_IP_DX_query opdx48 on opdx48.ref# = c.ref#      
                       and opdx48.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx48.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx48.line = 48 


 




____________________________________________________________________________________________________________________________________________________________________________________________________________________________
 
---Final ouput has the DX codes in the correct format up to 49-72 dx codes.



with cohert as(

select distinct 
OPDX.REF#,
Vendor_Name,
Sent_Date,
Claim_Type,
ICD_Level,
Encounter_ID,
Risk_Assessment_Code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
Member_Gender,
Health_Plan_Name,
Provider_Name_Last_Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
Type_of_Bill,
OPDX.Date_of_Service_From,
opdx.Date_of_Service_Thru,
Diagnosis_Code_Primary_POA,
Diagnosis_Code_Admitting,
Diagnosis_Code_Reason_for_Visit1,
Diagnosis_Code_Reason_for_Visit2,
Diagnosis_Code_Reason_for_Visit3,
Diagnosis_Code_E_Code1,
Diagnosis_Code_E_Code2,
Diagnosis_Code_E_Code3,
Diagnosis_Code_E_Code4,
Diagnosis_Code_E_Code5,
Diagnosis_Code_E_Code6,
Diagnosis_Code_E_Code7,
Diagnosis_Code_E_Code8,
Diagnosis_Code_E_Code9,
Diagnosis_Code_E_Code10,
Diagnosis_Code_E_Code11,
Diagnosis_Code_E_Code12,
Diagnosis_Code_E_Code1_POA,
Diagnosis_Code_E_Code2_POA,
Diagnosis_Code_E_Code3_POA,
Diagnosis_Code_E_Code4_POA,
Diagnosis_Code_E_Code5_POA,
Diagnosis_Code_E_Code6_POA,
Diagnosis_Code_E_Code7_POA,
Diagnosis_Code_E_Code8_POA,
Diagnosis_Code_E_Code9_POA,
Diagnosis_Code_E_Code10_POA,
Diagnosis_Code_E_Code11_POA,
Diagnosis_Code_E_Code12_POA,
Diagnosis_Code_Other1_POA,
Diagnosis_Code_Other2_POA,
Diagnosis_Code_Other3_POA,
Diagnosis_Code_Other4_POA,
Diagnosis_Code_Other5_POA,
Diagnosis_Code_Other6_POA,
Diagnosis_Code_Other7_POA,
Diagnosis_Code_Other8_POA,
Diagnosis_Code_Other9_POA,
Diagnosis_Code_Other10_POA,
Diagnosis_Code_Other11_POA,
Diagnosis_Code_Other12_POA,
Diagnosis_Code_Other13_POA,
Diagnosis_Code_Other14_POA,
Diagnosis_Code_Other15_POA,
Diagnosis_Code_Other16_POA,
Diagnosis_Code_Other17_POA,
Diagnosis_Code_Other18_POA,
Diagnosis_Code_Other19_POA,
Diagnosis_Code_Other20_POA,
Diagnosis_Code_Other21_POA,
Diagnosis_Code_Other22_POA,
Diagnosis_Code_Other23_POA,
Diagnosis_Code_Other24_POA,
Revenue_Code,
Procedure_Code_Type,
procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1 , 
Provider_Street_Address_2,
Provider_City,
Provider_State_Code, 
Provider_Zip_Code ,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code, 
Line_Charge,
Line_Units_Type,
Line_Units,
Provider_Signature_on_File,	
Provider_Accepts_Assignment,	
Benefits_Are_Assigned,
Release_of_Info_Ind,	
Inpatient_Discharge_Time,	
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
Patient_Amount_to_Pay,	
Service_Provided_on_Emergency_Basis,
Patient_Account_Number 
 from
 anthem_IP_DX_query opdx
 join Anthem_main_query main on main.ref# = opdx.ref#

 where 1=1
 and opdx.line > 48
 --and encounter_id = '21200537061213'
) 
select distinct 
c.REF#,
c.Vendor_Name,
c.Sent_Date,
c.Claim_Type,
c.ICD_Level,
c.Encounter_id,
c.Risk_Assessment_Code,
c.Member_ID_Health_Plan,
c.Member_ID_CMS_HICN,
c.Member_Site_Number,
c.Member_Name_Last,
c.Member_Name_First,
c.Member_date_of_birth,
c.Member_Gender,
c.Health_Plan_Name, 
c.Provider_Name_Last_Facility_Name,
c.Provider_Name_First,
c.Provider_NPI,
c.Provider_Tax_ID,
c.Provider_ID_Statutory,
c.Provider_ID_Internal,
c.Provider_Specialty,
c.Type_of_Bill,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
opdxp.dx as Diagnosis_Code_Primary,
c.Diagnosis_Code_Primary_POA,
c.DIAGNOSIS_CODE_ADMITTING,
c.Diagnosis_Code_Reason_for_Visit1,
c.Diagnosis_Code_Reason_for_Visit2,
c.Diagnosis_Code_Reason_for_Visit3,
c.Diagnosis_Code_E_Code1,
c.Diagnosis_Code_E_Code2,
c.Diagnosis_Code_E_Code3,
c.Diagnosis_Code_E_Code4,
c.Diagnosis_Code_E_Code5,
c.Diagnosis_Code_E_Code6,
c.Diagnosis_Code_E_Code7,
c.Diagnosis_Code_E_Code8,
c.Diagnosis_Code_E_Code9,
c.Diagnosis_Code_E_Code10,
c.Diagnosis_Code_E_Code11,
c.Diagnosis_Code_E_Code12,
c.Diagnosis_Code_E_Code1_POA,
c.Diagnosis_Code_E_Code2_POA,
c.Diagnosis_Code_E_Code3_POA,
c.Diagnosis_Code_E_Code4_POA,
c.Diagnosis_Code_E_Code5_POA,
c.Diagnosis_Code_E_Code6_POA,
c.Diagnosis_Code_E_Code7_POA,
c.Diagnosis_Code_E_Code8_POA,
c.Diagnosis_Code_E_Code9_POA,
c.Diagnosis_Code_E_Code10_POA,
c.Diagnosis_Code_E_Code11_POA,
c.Diagnosis_Code_E_Code12_POA,
opdx49.dx as Diagnosis_Code_Other1,
opdx50.dx as Diagnosis_Code_Other2,
opdx51.dx as Diagnosis_Code_Other3,
opdx52.dx as Diagnosis_Code_Other4,
opdx53.dx as Diagnosis_Code_Other5,
opdx54.dx as Diagnosis_Code_Other6,
opdx55.dx as Diagnosis_Code_Other7,
opdx56.dx as Diagnosis_Code_Other8,
opdx57.dx as Diagnosis_Code_Other9,
opdx58.dx as Diagnosis_Code_Other10,
opdx59.dx as Diagnosis_Code_Other11,
opdx60.dx as Diagnosis_Code_Other12,
opdx61.dx as Diagnosis_Code_Other13,
opdx62.dx as Diagnosis_Code_Other14,
opdx63.dx as Diagnosis_Code_Other15,
opdx64.dx as Diagnosis_Code_Other16,
opdx65.dx as Diagnosis_Code_Other17,
opdx66.dx as Diagnosis_Code_Other18,
opdx67.dx as Diagnosis_Code_Other19,
opdx68.dx as Diagnosis_Code_Other20,
opdx69.dx as Diagnosis_Code_Other21,
opdx70.dx as Diagnosis_Code_Other22,
opdx71.dx as Diagnosis_Code_Other23,
opdx72.dx as Diagnosis_Code_Other24,
case when c.Diagnosis_Code_Other1_POA is null and opdx49.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other1_POA,
case when c.Diagnosis_Code_Other2_POA is null and opdx50.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other2_POA,
case when c.Diagnosis_Code_Other3_POA is null and opdx51.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other3_POA,
case when c.Diagnosis_Code_Other4_POA is null and opdx52.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other4_POA,
case when c.Diagnosis_Code_Other5_POA is null and opdx53.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other5_POA,
case when c.Diagnosis_Code_Other6_POA is null and opdx54.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other6_POA,
case when c.Diagnosis_Code_Other7_POA is null and opdx55.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other7_POA,
case when c.Diagnosis_Code_Other8_POA is null and opdx56.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other8_POA,
case when c.Diagnosis_Code_Other9_POA is null and opdx57.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other9_POA,
case when c.Diagnosis_Code_Other10_POA is null and opdx58.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other10_POA,
case when c.Diagnosis_Code_Other11_POA is null and opdx59.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other11_POA,
case when c.Diagnosis_Code_Other12_POA is null and opdx60.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other12_POA,
case when c.Diagnosis_Code_Other13_POA is null and opdx61.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other13_POA,
case when c.Diagnosis_Code_Other14_POA is null and opdx62.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other14_POA,
case when c.Diagnosis_Code_Other15_POA is null and opdx63.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other15_POA,
case when c.Diagnosis_Code_Other16_POA is null and opdx64.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other16_POA,
case when c.Diagnosis_Code_Other17_POA is null and opdx65.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other17_POA,
case when c.Diagnosis_Code_Other18_POA is null and opdx66.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other18_POA,
case when c.Diagnosis_Code_Other19_POA is null and opdx67.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other19_POA,
case when c.Diagnosis_Code_Other20_POA is null and opdx68.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other20_POA,
case when c.Diagnosis_Code_Other21_POA is null and opdx69.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other21_POA,
case when c.Diagnosis_Code_Other22_POA is null and opdx70.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other22_POA,
case when c.Diagnosis_Code_Other23_POA is null and opdx71.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other23_POA,
case when c.Diagnosis_Code_Other24_POA is null and opdx72.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other24_POA,
c.Revenue_Code,
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_State_Code,
c.Provider_zip_code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.Line_Charge,
c. Line_Units_Type,
c. Line_Units,
c.Provider_Signature_on_File,
c.Provider_Accepts_Assignment,
c.Benefits_Are_Assigned,
c.Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
c.Patient_Amount_to_Pay,
c.Service_Provided_on_Emergency_Basis,
c.patient_account_number
      from cohert c
      left join anthem_IP_DX_query opdxp on opdxp.ref# = c.ref#      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
   left join anthem_IP_DX_query opdx49 on opdx49.ref# = c.ref#      
                       and opdx49.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx49.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx25.Procedure_Code = c.Procedure_Code
                        and  opdx49.line = 49  
     left join anthem_IP_DX_query opdx50 on opdx50.ref# = c.ref#      
                       and opdx50.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx50.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx26.Procedure_Code = c.Procedure_Code
                        and  opdx50.line = 50 
   left join anthem_IP_DX_query opdx51 on opdx51.ref# = c.ref#      
                       and opdx51.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx51.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx27.Procedure_Code = c.Procedure_Code
                        and  opdx51.line = 51   
   left join anthem_IP_DX_query opdx52 on opdx52.ref# = c.ref#      
                       and opdx52.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx52.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx28.Procedure_Code = c.Procedure_Code
                        and  opdx52.line = 52   
   left join anthem_IP_DX_query opdx53 on opdx53.ref# = c.ref#      
                       and opdx53.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx53.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx29.Procedure_Code = c.Procedure_Code
                        and  opdx53.line = 53   
   left join anthem_IP_DX_query opdx54 on opdx54.ref# = c.ref#      
                       and opdx54.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx54.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx30.Procedure_Code = c.Procedure_Code
                        and  opdx54.line = 54   
   left join anthem_IP_DX_query opdx55 on opdx55.ref# = c.ref#      
                       and opdx55.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx55.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx31.Procedure_Code = c.Procedure_Code
                        and  opdx55.line = 55   
   left join anthem_IP_DX_query opdx56 on opdx56.ref# = c.ref#      
                       and opdx56.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx56.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx32.Procedure_Code = c.Procedure_Code
                        and  opdx56.line = 56   
   left join anthem_IP_DX_query opdx57 on opdx57.ref# = c.ref#      
                       and opdx57.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx57.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx33.Procedure_Code = c.Procedure_Code
                        and  opdx57.line = 57   
   left join anthem_IP_DX_query opdx58 on opdx58.ref# = c.ref#      
                       and opdx58.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx58.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx34.Procedure_Code = c.Procedure_Code
                        and  opdx58.line = 58   
   left join anthem_IP_DX_query opdx59 on opdx59.ref# = c.ref#      
                       and opdx59.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx59.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx35.Procedure_Code = c.Procedure_Code
                        and  opdx59.line = 59  
 left join anthem_IP_DX_query opdx60 on opdx60.ref# = c.ref#      
                       and opdx60.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx60.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx36.Procedure_Code = c.Procedure_Code
                        and  opdx60.line = 60   
 left join anthem_IP_DX_query opdx61 on opdx61.ref# = c.ref#      
                       and opdx61.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx61.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx37.Procedure_Code = c.Procedure_Code
                        and  opdx61.line = 61   
 left join anthem_IP_DX_query opdx62 on opdx62.ref# = c.ref#      
                       and opdx62.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx62.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx38.Procedure_Code = c.Procedure_Code
                        and  opdx62.line = 62   
 left join anthem_IP_DX_query opdx63 on opdx63.ref# = c.ref#      
                       and opdx63.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx63.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx39.Procedure_Code = c.Procedure_Code
                        and  opdx63.line = 63   
 left join anthem_IP_DX_query opdx64 on opdx64.ref# = c.ref#      
                       and opdx64.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx64.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx64.line = 64 
left join anthem_IP_DX_query opdx65 on opdx65.ref# = c.ref#      
                       and opdx65.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx65.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx65.line = 65 
left join anthem_IP_DX_query opdx66 on opdx66.ref# = c.ref#      
                       and opdx66.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx66.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx66.line = 66 
left join anthem_IP_DX_query opdx67 on opdx67.ref# = c.ref#      
                       and opdx67.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx67.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx67.line = 67 
left join anthem_IP_DX_query opdx68 on opdx68.ref# = c.ref#      
                       and opdx68.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx68.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx68.line = 68 
left join anthem_IP_DX_query opdx69 on opdx69.ref# = c.ref#      
                       and opdx69.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx69.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx69.line = 69 
left join anthem_IP_DX_query opdx70 on opdx70.ref# = c.ref#      
                       and opdx70.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx70.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx70.line = 70
left join anthem_IP_DX_query opdx71 on opdx71.ref# = c.ref#      
                       and opdx71.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx71.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx71.line = 71 
left join anthem_IP_DX_query opdx72 on opdx72.ref# = c.ref#      
                      and opdx72.Date_of_Service_From = c.Date_of_Service_From
                      and  opdx72.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                      and  opdx72.line = 72 




_____________________________________________________________________________________________________________________________________________________________________________________________________________________________

---Final ouput has the DX codes in the correct format up to 73-96 dx codes.




with cohert as(

select distinct 
OPDX.REF#,
Vendor_Name,
Sent_Date,
Claim_Type,
ICD_Level,
Encounter_ID,
Risk_Assessment_Code,
Member_ID_Health_Plan,
Member_ID_CMS_HICN,
Member_Site_Number,
Member_Name_Last,
Member_Name_First,
Member_Date_of_Birth,
Member_Gender,
Health_Plan_Name,
Provider_Name_Last_Facility_Name,
Provider_Name_First,
Provider_NPI,
Provider_Tax_ID,
Provider_ID_Statutory,
Provider_ID_Internal,
Provider_Specialty,
Type_of_Bill,
OPDX.Date_of_Service_From,
opdx.Date_of_Service_Thru,
Diagnosis_Code_Primary_POA,
Diagnosis_Code_Admitting,
Diagnosis_Code_Reason_for_Visit1,
Diagnosis_Code_Reason_for_Visit2,
Diagnosis_Code_Reason_for_Visit3,
Diagnosis_Code_E_Code1,
Diagnosis_Code_E_Code2,
Diagnosis_Code_E_Code3,
Diagnosis_Code_E_Code4,
Diagnosis_Code_E_Code5,
Diagnosis_Code_E_Code6,
Diagnosis_Code_E_Code7,
Diagnosis_Code_E_Code8,
Diagnosis_Code_E_Code9,
Diagnosis_Code_E_Code10,
Diagnosis_Code_E_Code11,
Diagnosis_Code_E_Code12,
Diagnosis_Code_E_Code1_POA,
Diagnosis_Code_E_Code2_POA,
Diagnosis_Code_E_Code3_POA,
Diagnosis_Code_E_Code4_POA,
Diagnosis_Code_E_Code5_POA,
Diagnosis_Code_E_Code6_POA,
Diagnosis_Code_E_Code7_POA,
Diagnosis_Code_E_Code8_POA,
Diagnosis_Code_E_Code9_POA,
Diagnosis_Code_E_Code10_POA,
Diagnosis_Code_E_Code11_POA,
Diagnosis_Code_E_Code12_POA,
Diagnosis_Code_Other1_POA,
Diagnosis_Code_Other2_POA,
Diagnosis_Code_Other3_POA,
Diagnosis_Code_Other4_POA,
Diagnosis_Code_Other5_POA,
Diagnosis_Code_Other6_POA,
Diagnosis_Code_Other7_POA,
Diagnosis_Code_Other8_POA,
Diagnosis_Code_Other9_POA,
Diagnosis_Code_Other10_POA,
Diagnosis_Code_Other11_POA,
Diagnosis_Code_Other12_POA,
Diagnosis_Code_Other13_POA,
Diagnosis_Code_Other14_POA,
Diagnosis_Code_Other15_POA,
Diagnosis_Code_Other16_POA,
Diagnosis_Code_Other17_POA,
Diagnosis_Code_Other18_POA,
Diagnosis_Code_Other19_POA,
Diagnosis_Code_Other20_POA,
Diagnosis_Code_Other21_POA,
Diagnosis_Code_Other22_POA,
Diagnosis_Code_Other23_POA,
Diagnosis_Code_Other24_POA,
Revenue_Code,
Procedure_Code_Type,
procedure_Code,
Procedure_Modifier,
Provider_Street_Address_1 , 
Provider_Street_Address_2,
Provider_City,
Provider_State_Code, 
Provider_Zip_Code ,
Member_Street_Address_1,
Member_Street_Address_2,
Member_City,
Member_State_Code,
Member_Zip_Code, 
Line_Charge,
Line_Units_Type,
Line_Units,
Provider_Signature_on_File,	
Provider_Accepts_Assignment,	
Benefits_Are_Assigned,
Release_of_Info_Ind,	
Inpatient_Discharge_Time,	
Admission_Type_Code,
Admission_Source_Code,
Patient_Status_Code,
Patient_Amount_to_Pay,	
Service_Provided_on_Emergency_Basis,
Patient_Account_Number 
 from
 anthem_IP_DX_query opdx
 join Anthem_main_query main on main.ref# = opdx.ref#

 where 1=1
 and opdx.line > 72
 --and encounter_id = '2072000808491520'
) 
select distinct 
c.REF#,
c.Vendor_Name,
c.Sent_Date,
c.Claim_Type,
c.ICD_Level,
c.Encounter_id,
c.Risk_Assessment_Code,
c.Member_ID_Health_Plan,
c.Member_ID_CMS_HICN,
c.Member_Site_Number,
c.Member_Name_Last,
c.Member_Name_First,
c.Member_date_of_birth,
c.Member_Gender,
c.Health_Plan_Name, 
c.Provider_Name_Last_Facility_Name,
c.Provider_Name_First,
c.Provider_NPI,
c.Provider_Tax_ID,
c.Provider_ID_Statutory,
c.Provider_ID_Internal,
c.Provider_Specialty,
c.Type_of_Bill,
c.Date_of_Service_From,
c.Date_of_Service_Thru,
opdxp.dx as Diagnosis_Code_Primary,
c.Diagnosis_Code_Primary_POA,
c.DIAGNOSIS_CODE_ADMITTING,
c.Diagnosis_Code_Reason_for_Visit1,
c.Diagnosis_Code_Reason_for_Visit2,
c.Diagnosis_Code_Reason_for_Visit3,
c.Diagnosis_Code_E_Code1,
c.Diagnosis_Code_E_Code2,
c.Diagnosis_Code_E_Code3,
c.Diagnosis_Code_E_Code4,
c.Diagnosis_Code_E_Code5,
c.Diagnosis_Code_E_Code6,
c.Diagnosis_Code_E_Code7,
c.Diagnosis_Code_E_Code8,
c.Diagnosis_Code_E_Code9,
c.Diagnosis_Code_E_Code10,
c.Diagnosis_Code_E_Code11,
c.Diagnosis_Code_E_Code12,
c.Diagnosis_Code_E_Code1_POA,
c.Diagnosis_Code_E_Code2_POA,
c.Diagnosis_Code_E_Code3_POA,
c.Diagnosis_Code_E_Code4_POA,
c.Diagnosis_Code_E_Code5_POA,
c.Diagnosis_Code_E_Code6_POA,
c.Diagnosis_Code_E_Code7_POA,
c.Diagnosis_Code_E_Code8_POA,
c.Diagnosis_Code_E_Code9_POA,
c.Diagnosis_Code_E_Code10_POA,
c.Diagnosis_Code_E_Code11_POA,
c.Diagnosis_Code_E_Code12_POA,
opdx73.dx as Diagnosis_Code_Other1,
opdx74.dx as Diagnosis_Code_Other2,
opdx75.dx as Diagnosis_Code_Other3,
opdx76.dx as Diagnosis_Code_Other4,
opdx77.dx as Diagnosis_Code_Other5,
opdx78.dx as Diagnosis_Code_Other6,
opdx79.dx as Diagnosis_Code_Other7,
opdx80.dx as Diagnosis_Code_Other8,
opdx81.dx as Diagnosis_Code_Other9,
opdx82.dx as Diagnosis_Code_Other10,
opdx83.dx as Diagnosis_Code_Other11,
opdx84.dx as Diagnosis_Code_Other12,
opdx85.dx as Diagnosis_Code_Other13,
opdx86.dx as Diagnosis_Code_Other14,
opdx87.dx as Diagnosis_Code_Other15,
opdx88.dx as Diagnosis_Code_Other16,
opdx89.dx as Diagnosis_Code_Other17,
opdx90.dx as Diagnosis_Code_Other18,
opdx91.dx as Diagnosis_Code_Other19,
opdx92.dx as Diagnosis_Code_Other20,
opdx93.dx as Diagnosis_Code_Other21,
opdx94.dx as Diagnosis_Code_Other22,
opdx95.dx as Diagnosis_Code_Other23,
opdx96.dx as Diagnosis_Code_Other24,
case when c.Diagnosis_Code_Other1_POA is null and opdx73.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other1_POA,
case when c.Diagnosis_Code_Other2_POA is null and opdx74.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other2_POA,
case when c.Diagnosis_Code_Other3_POA is null and opdx75.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other3_POA,
case when c.Diagnosis_Code_Other4_POA is null and opdx76.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other4_POA,
case when c.Diagnosis_Code_Other5_POA is null and opdx77.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other5_POA,
case when c.Diagnosis_Code_Other6_POA is null and opdx78.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other6_POA,
case when c.Diagnosis_Code_Other7_POA is null and opdx79.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other7_POA,
case when c.Diagnosis_Code_Other8_POA is null and opdx80.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other8_POA,
case when c.Diagnosis_Code_Other9_POA is null and opdx81.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other9_POA,
case when c.Diagnosis_Code_Other10_POA is null and opdx82.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other10_POA,
case when c.Diagnosis_Code_Other11_POA is null and opdx83.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other11_POA,
case when c.Diagnosis_Code_Other12_POA is null and opdx84.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other12_POA,
case when c.Diagnosis_Code_Other13_POA is null and opdx85.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other13_POA,
case when c.Diagnosis_Code_Other14_POA is null and opdx86.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other14_POA,
case when c.Diagnosis_Code_Other15_POA is null and opdx87.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other15_POA,
case when c.Diagnosis_Code_Other16_POA is null and opdx88.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other16_POA,
case when c.Diagnosis_Code_Other17_POA is null and opdx89.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other17_POA,
case when c.Diagnosis_Code_Other18_POA is null and opdx90.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other18_POA,
case when c.Diagnosis_Code_Other19_POA is null and opdx91.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other19_POA,
case when c.Diagnosis_Code_Other20_POA is null and opdx92.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other20_POA,
case when c.Diagnosis_Code_Other21_POA is null and opdx93.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other21_POA,
case when c.Diagnosis_Code_Other22_POA is null and opdx94.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other22_POA,
case when c.Diagnosis_Code_Other23_POA is null and opdx95.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other23_POA,
case when c.Diagnosis_Code_Other24_POA is null and opdx96.dx is NOT null
THEN 'U'
else null
end as Diagnosis_Code_Other24_POA,
c.Revenue_Code,
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1,
c.Provider_Street_Address_2,
c.Provider_city,
c.Provider_State_Code,
c.Provider_zip_code,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code,
c.Line_Charge,
c. Line_Units_Type,
c. Line_Units,
c.Provider_Signature_on_File,
c.Provider_Accepts_Assignment,
c.Benefits_Are_Assigned,
c.Release_of_Info_Ind,
c.Inpatient_Discharge_Time,
c.Admission_Type_Code,
c.Admission_Source_Code,
c.Patient_Status_Code,
c.Patient_Amount_to_Pay,
c.Service_Provided_on_Emergency_Basis,
c.patient_account_number
      from cohert c
      left join anthem_IP_DX_query opdxp on opdxp.ref# = c.ref#      
                       and opdxp.Date_of_Service_From = c.Date_of_Service_From
                       and  opdxp.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdxp.Procedure_Code = c.Procedure_Code
                        and  opdxp.line = 1    
   left join anthem_IP_DX_query opdx73 on opdx73.ref# = c.ref#      
                       and opdx73.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx73.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx25.Procedure_Code = c.Procedure_Code
                        and  opdx73.line = 73  
     left join anthem_IP_DX_query opdx74 on opdx74.ref# = c.ref#      
                       and opdx74.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx74.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx26.Procedure_Code = c.Procedure_Code
                        and  opdx74.line = 74 
   left join anthem_IP_DX_query opdx75 on opdx75.ref# = c.ref#      
                       and opdx75.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx75.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx27.Procedure_Code = c.Procedure_Code
                        and  opdx75.line = 75   
   left join anthem_IP_DX_query opdx76 on opdx76.ref# = c.ref#      
                       and opdx76.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx76.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx28.Procedure_Code = c.Procedure_Code
                        and  opdx76.line = 76   
   left join anthem_IP_DX_query opdx77 on opdx77.ref# = c.ref#      
                       and opdx77.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx77.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx29.Procedure_Code = c.Procedure_Code
                        and  opdx77.line = 77   
   left join anthem_IP_DX_query opdx78 on opdx78.ref# = c.ref#      
                       and opdx78.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx78.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx30.Procedure_Code = c.Procedure_Code
                        and  opdx78.line = 78   
   left join anthem_IP_DX_query opdx79 on opdx79.ref# = c.ref#      
                       and opdx79.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx79.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx31.Procedure_Code = c.Procedure_Code
                        and  opdx79.line = 79   
   left join anthem_IP_DX_query opdx80 on opdx80.ref# = c.ref#      
                       and opdx80.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx80.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx32.Procedure_Code = c.Procedure_Code
                        and  opdx80.line = 80   
   left join anthem_IP_DX_query opdx81 on opdx81.ref# = c.ref#      
                       and opdx81.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx81.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx33.Procedure_Code = c.Procedure_Code
                        and  opdx81.line = 81   
   left join anthem_IP_DX_query opdx82 on opdx82.ref# = c.ref#      
                       and opdx82.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx82.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx34.Procedure_Code = c.Procedure_Code
                        and  opdx82.line = 82   
   left join anthem_IP_DX_query opdx83 on opdx83.ref# = c.ref#      
                       and opdx83.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx83.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx35.Procedure_Code = c.Procedure_Code
                        and  opdx83.line = 83  
 left join anthem_IP_DX_query opdx84 on opdx84.ref# = c.ref#      
                       and opdx84.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx84.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx36.Procedure_Code = c.Procedure_Code
                        and  opdx84.line = 84   
 left join anthem_IP_DX_query opdx85 on opdx85.ref# = c.ref#      
                       and opdx85.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx85.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx37.Procedure_Code = c.Procedure_Code
                        and  opdx85.line = 85   
 left join anthem_IP_DX_query opdx86 on opdx86.ref# = c.ref#      
                       and opdx86.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx86.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx38.Procedure_Code = c.Procedure_Code
                        and  opdx86.line = 86   
 left join anthem_IP_DX_query opdx87 on opdx87.ref# = c.ref#      
                       and opdx87.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx87.Date_of_Service_Thru = c.Date_of_Service_Thru  
                       --and   opdx39.Procedure_Code = c.Procedure_Code
                        and  opdx87.line = 87   
 left join anthem_IP_DX_query opdx88 on opdx88.ref# = c.ref#      
                       and opdx88.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx88.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx88.line = 88 
left join anthem_IP_DX_query opdx89 on opdx89.ref# = c.ref#      
                       and opdx89.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx89.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx89.line = 89 
left join anthem_IP_DX_query opdx90 on opdx90.ref# = c.ref#      
                       and opdx90.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx90.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx90.line = 90 
left join anthem_IP_DX_query opdx91 on opdx91.ref# = c.ref#      
                       and opdx91.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx91.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx91.line = 91 
left join anthem_IP_DX_query opdx92 on opdx92.ref# = c.ref#      
                       and opdx92.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx92.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx92.line = 92 
left join anthem_IP_DX_query opdx93 on opdx93.ref# = c.ref#      
                       and opdx93.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx93.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx93.line = 93 
left join anthem_IP_DX_query opdx94 on opdx94.ref# = c.ref#      
                       and opdx94.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx94.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx94.line = 94
left join anthem_IP_DX_query opdx95 on opdx95.ref# = c.ref#      
                       and opdx95.Date_of_Service_From = c.Date_of_Service_From
                       and  opdx95.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                        and  opdx95.line = 95 
left join anthem_IP_DX_query opdx96 on opdx96.ref# = c.ref#      
                      and opdx96.Date_of_Service_From = c.Date_of_Service_From
                      and  opdx96.Date_of_Service_Thru = c.Date_of_Service_Thru  
                      -- and   opdx40.Procedure_Code = c.Procedure_Code
                      and  opdx96.line = 96 