
--drop table Anthem_main_query; 

create table Anthem_main_query as
select
txi.tx_id "Tax ID1",
ibi.inv_num "REF#",
'MRCYMO' as Vendor_Name, --'MRCYMO'(EAST) 'MHSC'(SGF)
to_char(sysdate,'YYYYMMDD') as Sent_Date,
'P' as Claim_Type,
'10' as ICD_Level,
inv.visit_number as Encounter_ID,
cast(null as number) as Risk_Assessment_Code,
substr(cvg.subscr_num,4,9) as Member_ID_Health_Plan,
regexp_replace(cvg.medicare_subscr_id,'[- ]','') as Member_ID_CMS_HICN,
cast(null as number) as Member_Site_Number,
pat.pat_last_name as Member_Name_Last,
pat.pat_first_name as Member_Name_First,
to_char(pat.birth_date,'MM/DD/YYYY') as Member_date_of_birth,
case 
when pat.sex_c = 1 then 'F'
when pat.sex_c = 2 then 'M'
else pat.sex_c
end as Member_Gender,
'ANTHEM' Health_Plan_Name, 
initcap(SUBSTR(TRIM(SUBSTR(ser.PROV_NAME,1,DECODE(INSTR(ser.PROV_NAME,','),0,30,INSTR(ser.PROV_NAME,',')-1))),1,30)) as Provider_Name_Last_Facility_Name,
initcap(SUBSTR(REGEXP_SUBSTR(REGEXP_SUBSTR(ser.PROV_NAME,',([ ]|[[:alpha:]])[[:alpha:]]+'),'[[:alpha:]]+'),1,30)) as Provider_Name_First,
ser2.npi as Provider_NPI,
cv.bil_prov_taxid as Provider_Tax_ID,
cast(null as number) as Provider_ID_Statutory,
ser2.npi as Provider_ID_Internal,
cast(null as number) as  Provider_Specialty,
cv.bill_typ_fac_cd as Type_of_Bill,
to_char(arpb.service_date,'MM/DD/YYYY')   AS Date_of_Service_From,
to_char(arpb.service_date,'MM/DD/YYYY')  AS Date_of_Service_Thru,
cast(null as number) as Diagnosis_Code_Primary_POA,
cast(null as number) as Diagnosis_Code_Admitting,
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
 cast(null as number) as Revenue_code,
'HC' as Procedure_Code_Type,
arpb.cpt_code as  Procedure_Code,
--SLI.LN_PROC_MOD as Procedure_Modifier,
cast(null as number) Procedure_Modifier,
pos.address_line_1 as Provider_Street_Address_1 , 
pos.address_line_2 as Provider_Street_Address_2,
pos.city as Provider_City,
zs.abbr as Provider_State_Code, 
case 
when pos.zip is null then '123459998'
when substr(pos.zip ,6,9) is null then replace(pos.zip, '-','')||'9998'
else replace(pos.zip, '-','') 
end as Provider_Zip_Code ,
pat.add_line_1 AS Member_Street_Address_1,
Pat.add_line_2 AS Member_Street_Address_2,
pat.city  as Member_City,
st.abbr as Member_State_Code,
case 
when pat.zip is null then '123459998'
WHEN substr(pat.zip ,6,9) is null then replace(pat.zip, '-','')||'9998'
else replace(pat.zip, '-','') 
end Member_Zip_Code ,
'000' as Line_Charge,
--sli.ln_qty_qual as Line_Units_Type,
'UN'  as Line_Units_Type,
--SLI.LN_QTY as Line_Units,
'1' as Line_Units,
'Y' as Provider_Signature_on_File,	
'A' as Provider_Accepts_Assignment,	
'Y' as Benefits_Are_Assigned,
'I' as Release_of_Info_Ind,	
cast(null as number) as Inpatient_Discharge_Time,
cast(null as number) as Admission_Type_Code,
cast(null as number) as Admission_Source_Code,
cast(null as number) as Patient_Status_Code,
'000' as Patient_Amount_to_Pay,
cast(null as number) as Service_Provided_on_Emergency_Basis,	
'RRM3O' as Patient_Account_Number ---- RRM3O (EAST) 'RRM8S'(SGF)
from invoice inv
join inv_basic_info ibi on inv.invoice_id = ibi.inv_id
join clarity.svc_ln_info sli on ibi.clm_ext_val_id = SLI.RECORD_ID
JOIN HSP_ACCOUNT HA ON inv.visit_number = HA.HSP_ACCOUNT_ID
join clarity.clarity_loc loc on HA.loc_id = loc.loc_id 
join clarity.clm_values cv on cv.record_id = sli.record_id 
join clarity.clm_values_2 cv2 on sli.record_id = cv2.record_id
join bi_clarity.mv_ref_ser refser on ha.attending_prov_id = refser.prov_id
join coverage cvg on ibi.cvg_id = cvg.coverage_id
join clarity_epp epp on cvg.plan_id = epp.benefit_plan_id 
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
--and prov_id = '4109157'
--and prov_npi_id = 1447283551 --- test that had duplication problem
--and INV.pat_id = 'Z7864864'
AND SLI.LINE = 1 
and ibi.inv_status_c not in (4,5,7,8)    ------- Errors, rejected, removes voids and removed claims
and substr( cvg.SUBSCR_NUM, 1,3) not in('MCM','M3A','MCM','XCS')
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
and loc.loc_id in (20001, --    PARENT MERCY HOSPITAL ST LOUIS  ------------east('MRCYMO')
20002, --    PARENT MERCY HOSPITAL WASHINGTON   
20004, --    PARENT MERCY HOSPITAL JEFFERSON  
20006, --    PARENT MERCY HOSPITAL LINCOLN
 20007,   --PARENT MERCY HOSPITAL SOUTH
20010,  --PARENT MERCY HOSPITAL PERRY
20012)  --PARENT MERCY HOSPITAL SOUTHEAST

and ibi.EPP_ID in (2004702, ----	BCBS MEDICARE HMO 
2004703, ----	BCBS MEDICARE PFFS 
2004704, ----	BCBS HEALTH ADV MEDIPAK ADV HMO H9699 MCR 
32004702, ----	BCBS MEDICARE HMO CONTRACTED 
32004703, ----	BCBS MEDICARE PFFS CONTRACTED 
32004704 ----	BCBS HEALTH ADV MEDIPAK ADV HMO H9699 MCR CONTRACTED 
)
--and ibi.inv_num = '205656974'
and ibi.to_svc_date  >= '01-JAN-25'
and ibi.to_svc_date  < '01-JAN-26'
and ( cv.bill_typ_fac_cd in (11, 12, 18) or
        ( cv.bill_typ_fac_cd in (13, 14, 71, 73, 76, 77, 85
        , 02, 22 --- added 02,22 on 7/15 due to it eliminating a confidential OV and ECHO identified as needing to be on
        , 19, 21, 23, 31, 33) ------- based off of previously submitted files for Humana 
        )
        )
and arpb.cpt_code in (select distinct proc_code from lareed4.sweeps_cpt_hcpcs_list_2025)

______________________________________________________________________________________________________________________________________________________________________________________________________________________________


--DX Code query grabs all the DX codes from the UHC_main_query


--drop table Anthem_AMB_DX_query;   


create table Anthem_AMB_DX_query as
select distinct
main.ref#,
main.date_of_service_from,
main.date_of_service_thru,
replace(vdx.dx_code,'.','') as dx,
DENSE_RANK() OVER (PARTITION BY ref#,procedure_code,date_of_service_from,date_of_service_thru ORDER BY ref#,date_of_service_from,date_of_service_thru,line ASC) line,
main.procedure_code
from  Anthem_main_query main 
 join v_arpb_coding_dx vdx on main."Tax ID1" = vdx.tx_id 
                                  and vdx.source_key = 3
 where 1=1
  and vdx.dx_code is not null
  

_____________________________________________________________________________________________________________________________________________________________________________________________________________________________




---Final ouput has the DX codes in the correct format up to 24 dx codes.
------ make sure to get the names matched up


with cohert as(

select distinct 
opdx.REF#,
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
Member_date_of_birth,
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
opdx.Date_of_Service_From,
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
Revenue_code,
Procedure_Code_Type,
opdx.Procedure_Code,
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
Member_Zip_Code ,
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
Patient_Account_Number ---- RRM30 for MRCYMO,
from
 Anthem_AMB_DX_query  opdx
 join Anthem_main_query main on main.ref# = opdx.ref#

 where 1=1
   --and opdx.ref# = 'PJP1376469780'
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
opdx.dx as Diagnosis_Code_Primary,
c.Diagnosis_Code_Primary_POA,
c.Diagnosis_Code_Admitting,
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
c.Diagnosis_Code_Other1_POA,
c.Diagnosis_Code_Other2_POA,
c.Diagnosis_Code_Other3_POA,
c.Diagnosis_Code_Other4_POA,
c.Diagnosis_Code_Other5_POA,
c.Diagnosis_Code_Other6_POA,
c.Diagnosis_Code_Other7_POA,
c.Diagnosis_Code_Other8_POA,
c.Diagnosis_Code_Other9_POA,
c.Diagnosis_Code_Other10_POA,
c.Diagnosis_Code_Other11_POA,
c.Diagnosis_Code_Other12_POA,
c.Diagnosis_Code_Other13_POA,
c.Diagnosis_Code_Other14_POA,
c.Diagnosis_Code_Other15_POA,
c.Diagnosis_Code_Other16_POA,
c.Diagnosis_Code_Other17_POA,
c.Diagnosis_Code_Other18_POA,
c.Diagnosis_Code_Other19_POA,
c.Diagnosis_Code_Other20_POA,
c.Diagnosis_Code_Other21_POA,
c.Diagnosis_Code_Other22_POA,
c.Diagnosis_Code_Other23_POA,
c.Diagnosis_Code_Other24_POA,
c.Revenue_code,
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1 , 
c.Provider_Street_Address_2,
c.Provider_City,
c.Provider_State_Code, 
c.Provider_Zip_Code ,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code ,
c.Line_Charge,
c.Line_Units_Type, 
c.Line_Units,
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
c.Patient_Account_Number
     from cohert c
left join Anthem_AMB_DX_query opdx on opdx.ref# = c.ref#      
                       and opdx.date_of_service_from = c.date_of_service_from
                       and  opdx.date_of_service_thru = c.date_of_service_thru  
                       and   opdx.procedure_code = c.procedure_code
                        and  opdx.line = 1           
left join Anthem_AMB_DX_query opdx on opdx.ref# = c.ref#      
                       and opdx.date_of_service_from = c.date_of_service_from
                       and  opdx.date_of_service_thru = c.date_of_service_thru  
                       and   opdx.procedure_code = c.procedure_code
                        and  opdx.line = 1           
  left join Anthem_AMB_DX_query opdx1 on opdx1.ref# = c.ref#      
                       and opdx1.date_of_service_from = c.date_of_service_from
                       and  opdx1.date_of_service_thru = c.date_of_service_thru  
                       and   opdx1.procedure_code = c.procedure_code
                        and  opdx1.line = 1                   
   left join Anthem_AMB_DX_query opdx2 on opdx2.ref# = c.ref#      
                       and opdx2.date_of_service_from = c.date_of_service_from
                       and  opdx2.date_of_service_thru = c.date_of_service_thru  
                       and   opdx2.procedure_code = c.procedure_code
                        and  opdx2.line = 2                                     
   left join Anthem_AMB_DX_query opdx3 on opdx3.ref# = c.ref#      
                       and opdx3.date_of_service_from = c.date_of_service_from
                       and  opdx3.date_of_service_thru = c.date_of_service_thru  
                       and   opdx3.procedure_code = c.procedure_code
                        and  opdx3.line = 3   
    left join Anthem_AMB_DX_query opdx4 on opdx4.ref# = c.ref#      
                       and opdx4.date_of_service_from = c.date_of_service_from
                       and  opdx4.date_of_service_thru = c.date_of_service_thru  
                       and   opdx4.procedure_code = c.procedure_code
                        and  opdx4.line = 4   
   left join Anthem_AMB_DX_query opdx5 on opdx5.ref# = c.ref#      
                       and opdx5.date_of_service_from = c.date_of_service_from
                       and  opdx5.date_of_service_thru = c.date_of_service_thru  
                       and   opdx5.procedure_code = c.procedure_code
                        and  opdx5.line = 5   
   left join Anthem_AMB_DX_query opdx6 on opdx6.ref# = c.ref#      
                       and opdx6.date_of_service_from = c.date_of_service_from
                       and  opdx6.date_of_service_thru = c.date_of_service_thru  
                       and   opdx6.procedure_code = c.procedure_code
                        and  opdx6.line = 6   
   left join Anthem_AMB_DX_query opdx7 on opdx7.ref# = c.ref#      
                       and opdx7.date_of_service_from = c.date_of_service_from
                       and  opdx7.date_of_service_thru = c.date_of_service_thru  
                       and   opdx7.procedure_code = c.procedure_code
                        and  opdx7.line = 7   
   left join Anthem_AMB_DX_query opdx8 on opdx8.ref# = c.ref#      
                       and opdx8.date_of_service_from = c.date_of_service_from
                       and  opdx8.date_of_service_thru = c.date_of_service_thru  
                       and   opdx8.procedure_code = c.procedure_code
                        and  opdx8.line = 8   
   left join Anthem_AMB_DX_query opdx9 on opdx9.ref# = c.ref#      
                       and opdx9.date_of_service_from = c.date_of_service_from
                       and  opdx9.date_of_service_thru = c.date_of_service_thru  
                       and   opdx9.procedure_code = c.procedure_code
                        and  opdx9.line = 9   
   left join Anthem_AMB_DX_query opdx10 on opdx10.ref# = c.ref#      
                       and opdx10.date_of_service_from = c.date_of_service_from
                       and  opdx10.date_of_service_thru = c.date_of_service_thru  
                       and   opdx10.procedure_code = c.procedure_code
                        and  opdx10.line = 10   
   left join Anthem_AMB_DX_query opdx11 on opdx11.ref# = c.ref#      
                       and opdx11.date_of_service_from = c.date_of_service_from
                       and  opdx11.date_of_service_thru = c.date_of_service_thru  
                       and   opdx11.procedure_code = c.procedure_code
                        and  opdx11.line = 11   
   left join Anthem_AMB_DX_query opdx12 on opdx12.ref# = c.ref#      
                       and opdx12.date_of_service_from = c.date_of_service_from
                       and  opdx12.date_of_service_thru = c.date_of_service_thru  
                       and   opdx12.procedure_code = c.procedure_code
                        and  opdx12.line = 12   
   left join Anthem_AMB_DX_query opdx13 on opdx13.ref# = c.ref#      
                       and opdx13.date_of_service_from = c.date_of_service_from
                       and  opdx13.date_of_service_thru = c.date_of_service_thru  
                       and   opdx13.procedure_code = c.procedure_code
                        and  opdx13.line = 13   
   left join Anthem_AMB_DX_query opdx14 on opdx14.ref# = c.ref#      
                       and opdx14.date_of_service_from = c.date_of_service_from
                       and  opdx14.date_of_service_thru = c.date_of_service_thru  
                       and   opdx14.procedure_code = c.procedure_code
                       and  opdx14.line = 14   
   left join Anthem_AMB_DX_query opdx15 on opdx15.ref# = c.ref#      
                       and opdx15.date_of_service_from = c.date_of_service_from
                       and  opdx15.date_of_service_thru = c.date_of_service_thru  
                       and   opdx15.procedure_code = c.procedure_code
                        and  opdx15.line = 15   
   left join Anthem_AMB_DX_query opdx16 on opdx16.ref# = c.ref#      
                       and opdx16.date_of_service_from = c.date_of_service_from
                       and  opdx16.date_of_service_thru = c.date_of_service_thru  
                       and   opdx16.procedure_code = c.procedure_code
                        and  opdx16.line = 16   
    left join Anthem_AMB_DX_query opdx17 on opdx17.ref# = c.ref#      
                       and opdx17.date_of_service_from = c.date_of_service_from
                       and  opdx17.date_of_service_thru = c.date_of_service_thru  
                       and   opdx17.procedure_code = c.procedure_code
                        and  opdx17.line = 17   
   left join Anthem_AMB_DX_query opdx18 on opdx18.ref# = c.ref#      
                       and opdx18.date_of_service_from = c.date_of_service_from
                       and  opdx18.date_of_service_thru = c.date_of_service_thru  
                       and   opdx18.procedure_code = c.procedure_code
                        and  opdx18.line = 18   
   left join Anthem_AMB_DX_query opdx19 on opdx19.ref# = c.ref#      
                       and opdx19.date_of_service_from = c.date_of_service_from
                       and  opdx19.date_of_service_thru = c.date_of_service_thru  
                       and   opdx19.procedure_code = c.procedure_code
                        and  opdx19.line = 19   
   left join Anthem_AMB_DX_query opdx20 on opdx20.ref# = c.ref#      
                       and opdx20.date_of_service_from = c.date_of_service_from
                       and  opdx20.date_of_service_thru = c.date_of_service_thru  
                       and   opdx20.procedure_code = c.procedure_code
                        and  opdx20.line = 20   
   left join Anthem_AMB_DX_query opdx21 on opdx21.ref# = c.ref#      
                       and opdx21.date_of_service_from = c.date_of_service_from
                       and  opdx21.date_of_service_thru = c.date_of_service_thru  
                       and   opdx21.procedure_code = c.procedure_code
                        and  opdx21.line = 21   
   left join Anthem_AMB_DX_query opdx22 on opdx22.ref# = c.ref#      
                       and opdx22.date_of_service_from = c.date_of_service_from
                       and  opdx22.date_of_service_thru = c.date_of_service_thru  
                       and   opdx22.procedure_code = c.procedure_code
                        and  opdx22.line = 22   
   left join Anthem_AMB_DX_query opdx23 on opdx23.ref# = c.ref#      
                       and opdx23.date_of_service_from = c.date_of_service_from
                       and  opdx23.date_of_service_thru = c.date_of_service_thru  
                       and   opdx23.procedure_code = c.procedure_code
                        and  opdx23.line = 23   
   left join Anthem_AMB_DX_query opdx24 on opdx24.ref# = c.ref#      
                       and opdx24.date_of_service_from = c.date_of_service_from
                       and  opdx24.date_of_service_thru = c.date_of_service_thru  
                       and   opdx24.procedure_code = c.procedure_code
                        and  opdx24.line = 24   
                  
                        
_____________________________________________________________________________________________________________________________________________________________________________________________________________________________

 ---Final ouput has the DX codes in the correct format 25-48 dx codes.  

with cohert as(

select distinct 
opdx.REF#,
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
Member_date_of_birth,
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
opdx.Date_of_Service_From,
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
Revenue_code,
Procedure_Code_Type,
opdx.Procedure_Code,
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
Member_Zip_Code ,
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
Patient_Account_Number ---- RRM30 for MRCYMO,
from
 Anthem_AMB_DX_query  opdx
 join Anthem_main_query main on main.ref# = opdx.ref#
  where 1=1
 and opdx.line > 24 
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
opdx.dx as Diagnosis_Code_Primary,
c.Diagnosis_Code_Primary_POA,
c.Diagnosis_Code_Admitting,
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
opdx25.dx as dx_1,
opdx26.dx as dx_2,
opdx27.dx as dx_3,
opdx28.dx as dx_4,
opdx29.dx as dx_5,
opdx30.dx as dx_6,
opdx31.dx as dx_7,
opdx32.dx as dx_8,
opdx33.dx as dx_9,
opdx34.dx as dx_10,
opdx35.dx as dx_11,
opdx36.dx as dx_12,
opdx37.dx as dx_13,
opdx38.dx as dx_14,
opdx39.dx as dx_15,
opdx40.dx as dx_16,
opdx41.dx as dx_17,
opdx42.dx as dx_18,
opdx43.dx as dx_19,
opdx44.dx as dx_20,
opdx45.dx as dx_21,
opdx46.dx as dx_22,
opdx47.dx as dx_23,
opdx48.dx as dx_24,
c.Diagnosis_Code_Other1_POA,
c.Diagnosis_Code_Other2_POA,
c.Diagnosis_Code_Other3_POA,
c.Diagnosis_Code_Other4_POA,
c.Diagnosis_Code_Other5_POA,
c.Diagnosis_Code_Other6_POA,
c.Diagnosis_Code_Other7_POA,
c.Diagnosis_Code_Other8_POA,
c.Diagnosis_Code_Other9_POA,
c.Diagnosis_Code_Other10_POA,
c.Diagnosis_Code_Other11_POA,
c.Diagnosis_Code_Other12_POA,
c.Diagnosis_Code_Other13_POA,
c.Diagnosis_Code_Other14_POA,
c.Diagnosis_Code_Other15_POA,
c.Diagnosis_Code_Other16_POA,
c.Diagnosis_Code_Other17_POA,
c.Diagnosis_Code_Other18_POA,
c.Diagnosis_Code_Other19_POA,
c.Diagnosis_Code_Other20_POA,
c.Diagnosis_Code_Other21_POA,
c.Diagnosis_Code_Other22_POA,
c.Diagnosis_Code_Other23_POA,
c.Diagnosis_Code_Other24_POA,
c.Revenue_code,
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1 , 
c.Provider_Street_Address_2,
c.Provider_City,
c.Provider_State_Code, 
c.Provider_Zip_Code ,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code ,
c.Line_Charge,
c.Line_Units_Type, 
c.Line_Units,
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
c.Patient_Account_Number ---- RRM30 for MRCYMO,
      from cohert c
 left join Anthem_AMB_DX_query opdx on opdx.ref# = c.ref#      
                       and opdx.date_of_service_from = c.date_of_service_from
                       and  opdx.date_of_service_thru = c.date_of_service_thru  
                       and   opdx.procedure_code = c.procedure_code
                        and  opdx.line = 1          
  left join Anthem_AMB_DX_query opdx25 on opdx25.ref# = c.ref#      
                       and opdx25.date_of_service_from = c.date_of_service_from
                       and  opdx25.date_of_service_thru = c.date_of_service_thru  
                       and   opdx25.procedure_code = c.procedure_code
                        and  opdx25.line = 25                   
   left join Anthem_AMB_DX_query opdx26 on opdx26.ref# = c.ref#      
                       and opdx26.date_of_service_from = c.date_of_service_from
                       and  opdx26.date_of_service_thru = c.date_of_service_thru  
                       and   opdx26.procedure_code = c.procedure_code
                        and  opdx26.line = 26                                     
   left join Anthem_AMB_DX_query opdx27 on opdx27.ref# = c.ref#      
                       and opdx27.date_of_service_from = c.date_of_service_from
                       and  opdx27.date_of_service_thru = c.date_of_service_thru  
                       and   opdx27.procedure_code = c.procedure_code
                        and  opdx27.line = 27   
    left join Anthem_AMB_DX_query opdx28 on opdx28.ref# = c.ref#      
                       and opdx28.date_of_service_from = c.date_of_service_from
                       and  opdx28.date_of_service_thru = c.date_of_service_thru  
                       and   opdx28.procedure_code = c.procedure_code
                        and  opdx28.line = 28   
   left join Anthem_AMB_DX_query opdx29 on opdx29.ref# = c.ref#      
                       and opdx29.date_of_service_from = c.date_of_service_from
                       and  opdx29.date_of_service_thru = c.date_of_service_thru  
                       and   opdx29.procedure_code = c.procedure_code
                        and  opdx29.line = 29   
   left join Anthem_AMB_DX_query opdx30 on opdx30.ref# = c.ref#      
                       and opdx30.date_of_service_from = c.date_of_service_from
                       and  opdx30.date_of_service_thru = c.date_of_service_thru  
                       and   opdx30.procedure_code = c.procedure_code
                        and  opdx30.line = 30   
   left join Anthem_AMB_DX_query opdx31 on opdx31.ref# = c.ref#      
                       and opdx31.date_of_service_from = c.date_of_service_from
                       and opdx31.date_of_service_thru = c.date_of_service_thru  
                       and opdx31.procedure_code = c.procedure_code
                        and  opdx31.line = 31 
   left join Anthem_AMB_DX_query opdx32 on opdx32.ref# = c.ref#      
                       and opdx32.date_of_service_from = c.date_of_service_from
                       and  opdx32.date_of_service_thru = c.date_of_service_thru  
                       and  opdx32.procedure_code = c.procedure_code
                        and opdx32.line = 32
   left join Anthem_AMB_DX_query opdx33 on opdx33.ref# = c.ref#      
                       and opdx33.date_of_service_from = c.date_of_service_from
                       and  opdx33.date_of_service_thru = c.date_of_service_thru  
                       and  opdx33.procedure_code = c.procedure_code
                        and opdx33.line = 33   
     left join Anthem_AMB_DX_query opdx34 on opdx34.ref# = c.ref#      
                       and opdx34.date_of_service_from = c.date_of_service_from
                       and opdx34.date_of_service_thru = c.date_of_service_thru  
                       and opdx34.procedure_code = c.procedure_code
                        and  opdx31.line = 34 
   left join Anthem_AMB_DX_query opdx35 on opdx35.ref# = c.ref#      
                       and opdx35.date_of_service_from = c.date_of_service_from
                       and  opdx35.date_of_service_thru = c.date_of_service_thru  
                       and  opdx35.procedure_code = c.procedure_code
                        and opdx35.line = 35
   left join Anthem_AMB_DX_query opdx36 on opdx36.ref# = c.ref#      
                       and opdx36.date_of_service_from = c.date_of_service_from
                       and  opdx36.date_of_service_thru = c.date_of_service_thru  
                       and  opdx36.procedure_code = c.procedure_code
                        and opdx36.line = 36   
 left join Anthem_AMB_DX_query opdx37 on opdx37.ref# = c.ref#      
                       and opdx37.date_of_service_from = c.date_of_service_from
                       and opdx37.date_of_service_thru = c.date_of_service_thru  
                       and opdx37.procedure_code = c.procedure_code
                        and  opdx37.line = 37 
   left join Anthem_AMB_DX_query opdx38 on opdx38.ref# = c.ref#      
                        and opdx38.date_of_service_from = c.date_of_service_from
                       and  opdx38.date_of_service_thru = c.date_of_service_thru  
                       and  opdx38.procedure_code = c.procedure_code
                        and opdx38.line = 38
   left join Anthem_AMB_DX_query opdx39 on opdx39.ref# = c.ref#      
                       and opdx39.date_of_service_from = c.date_of_service_from
                       and  opdx39.date_of_service_thru = c.date_of_service_thru  
                       and  opdx39.procedure_code = c.procedure_code
                        and opdx39.line = 39                         
 left join Anthem_AMB_DX_query opdx40 on opdx40.ref# = c.ref#      
                       and opdx40.date_of_service_from = c.date_of_service_from
                       and opdx40.date_of_service_thru = c.date_of_service_thru  
                       and opdx40.procedure_code = c.procedure_code
                        and  opdx40.line = 40 
   left join Anthem_AMB_DX_query opdx41 on opdx41.ref# = c.ref#      
                        and opdx41.date_of_service_from = c.date_of_service_from
                       and  opdx41.date_of_service_thru = c.date_of_service_thru  
                       and  opdx41.procedure_code = c.procedure_code
                        and opdx41.line = 41
   left join Anthem_AMB_DX_query opdx42 on opdx42.ref# = c.ref#      
                       and opdx42.date_of_service_from = c.date_of_service_from
                       and  opdx42.date_of_service_thru = c.date_of_service_thru  
                       and  opdx42.procedure_code = c.procedure_code
                        and opdx42.line = 42
left join Anthem_AMB_DX_query opdx43 on opdx43.ref# = c.ref#      
                       and opdx43.date_of_service_from = c.date_of_service_from
                       and opdx43.date_of_service_thru = c.date_of_service_thru  
                       and opdx43.procedure_code = c.procedure_code
                        and  opdx43.line = 43 
   left join Anthem_AMB_DX_query opdx44 on opdx44.ref# = c.ref#      
                        and opdx44.date_of_service_from = c.date_of_service_from
                       and  opdx44.date_of_service_thru = c.date_of_service_thru  
                       and  opdx44.procedure_code = c.procedure_code
                        and opdx44.line = 44
   left join Anthem_AMB_DX_query opdx45 on opdx45.ref# = c.ref#      
                       and opdx45.date_of_service_from = c.date_of_service_from
                       and  opdx45.date_of_service_thru = c.date_of_service_thru  
                       and  opdx45.procedure_code = c.procedure_code
                        and opdx45.line = 45                       
left join Anthem_AMB_DX_query opdx46 on opdx46.ref# = c.ref#      
                       and opdx46.date_of_service_from = c.date_of_service_from
                       and opdx46.date_of_service_thru = c.date_of_service_thru  
                       and opdx46.procedure_code = c.procedure_code
                        and  opdx46.line = 46 
   left join Anthem_AMB_DX_query opdx47 on opdx47.ref# = c.ref#      
                        and opdx47.date_of_service_from = c.date_of_service_from
                       and  opdx47.date_of_service_thru = c.date_of_service_thru  
                       and  opdx47.procedure_code = c.procedure_code
                        and opdx47.line = 47
   left join Anthem_AMB_DX_query opdx48 on opdx48.ref# = c.ref#      
                       and opdx48.date_of_service_from = c.date_of_service_from
                       and  opdx48.date_of_service_thru = c.date_of_service_thru  
                       and  opdx48.procedure_code = c.procedure_code
                        and opdx48.line = 48                             

_________________________________________________________________________________________________________________________________________________________
---Final ouput has the DX codes in the correct format 49-72 dx codes.  



with cohert as(

select distinct 
opdx.REF#,
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
Member_date_of_birth,
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
opdx.Date_of_Service_From,
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
Revenue_code,
Procedure_Code_Type,
opdx.Procedure_Code,
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
Member_Zip_Code ,
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
Patient_Account_Number ---- RRM30 for MRCYMO,
from
 Anthem_AMB_DX_query  opdx
 join Anthem_main_query main on main.ref# = opdx.ref#
  where 1=1
 and opdx.line > 48 
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
opdx.dx as Diagnosis_Code_Primary,
c.Diagnosis_Code_Primary_POA,
c.Diagnosis_Code_Admitting,
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
opdx49.dx as dx_1,
opdx50.dx as dx_2,
opdx51.dx as dx_3,
opdx52.dx as dx_4,
opdx53.dx as dx_5,
opdx54.dx as dx_6,
opdx55.dx as dx_7,
opdx56.dx as dx_8,
opdx57.dx as dx_9,
opdx58.dx as dx_10,
opdx59.dx as dx_11,
opdx60.dx as dx_12,
opdx61.dx as dx_13,
opdx62.dx as dx_14,
opdx63.dx as dx_15,
opdx64.dx as dx_16,
opdx65.dx as dx_17,
opdx66.dx as dx_18,
opdx67.dx as dx_19,
opdx68.dx as dx_20,
opdx69.dx as dx_21,
opdx70.dx as dx_22,
opdx71.dx as dx_23,
opdx72.dx as dx_24,
c.Diagnosis_Code_Other1_POA,
c.Diagnosis_Code_Other2_POA,
c.Diagnosis_Code_Other3_POA,
c.Diagnosis_Code_Other4_POA,
c.Diagnosis_Code_Other5_POA,
c.Diagnosis_Code_Other6_POA,
c.Diagnosis_Code_Other7_POA,
c.Diagnosis_Code_Other8_POA,
c.Diagnosis_Code_Other9_POA,
c.Diagnosis_Code_Other10_POA,
c.Diagnosis_Code_Other11_POA,
c.Diagnosis_Code_Other12_POA,
c.Diagnosis_Code_Other13_POA,
c.Diagnosis_Code_Other14_POA,
c.Diagnosis_Code_Other15_POA,
c.Diagnosis_Code_Other16_POA,
c.Diagnosis_Code_Other17_POA,
c.Diagnosis_Code_Other18_POA,
c.Diagnosis_Code_Other19_POA,
c.Diagnosis_Code_Other20_POA,
c.Diagnosis_Code_Other21_POA,
c.Diagnosis_Code_Other22_POA,
c.Diagnosis_Code_Other23_POA,
c.Diagnosis_Code_Other24_POA,
c.Revenue_code,
c.Procedure_Code_Type,
c.Procedure_Code,
c.Procedure_Modifier,
c.Provider_Street_Address_1 , 
c.Provider_Street_Address_2,
c.Provider_City,
c.Provider_State_Code, 
c.Provider_Zip_Code ,
c.Member_Street_Address_1,
c.Member_Street_Address_2,
c.Member_City,
c.Member_State_Code,
c.Member_Zip_Code ,
c.Line_Charge,
c.Line_Units_Type, 
c.Line_Units,
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
c.Patient_Account_Number ---- RRM30 for MRCYMO,
      from cohert c
 left join Anthem_AMB_DX_query opdx on opdx.ref# = c.ref#      
                       and opdx.date_of_service_from = c.date_of_service_from
                       and  opdx.date_of_service_thru = c.date_of_service_thru  
                       and   opdx.procedure_code = c.procedure_code
                        and  opdx.line = 1          
  left join Anthem_AMB_DX_query opdx49 on opdx49.ref# = c.ref#      
                       and opdx49.date_of_service_from = c.date_of_service_from
                       and  opdx49.date_of_service_thru = c.date_of_service_thru  
                       and   opdx49.procedure_code = c.procedure_code
                        and  opdx49.line = 49                   
   left join Anthem_AMB_DX_query opdx50 on opdx50.ref# = c.ref#      
                       and opdx50.date_of_service_from = c.date_of_service_from
                       and  opdx50.date_of_service_thru = c.date_of_service_thru  
                       and   opdx50.procedure_code = c.procedure_code
                        and  opdx50.line = 50                                     
   left join Anthem_AMB_DX_query opdx51 on opdx51.ref# = c.ref#      
                       and opdx51.date_of_service_from = c.date_of_service_from
                       and  opdx51.date_of_service_thru = c.date_of_service_thru  
                       and   opdx51.procedure_code = c.procedure_code
                        and  opdx51.line = 51   
    left join Anthem_AMB_DX_query opdx52 on opdx52.ref# = c.ref#      
                       and opdx52.date_of_service_from = c.date_of_service_from
                       and  opdx52.date_of_service_thru = c.date_of_service_thru  
                       and   opdx52.procedure_code = c.procedure_code
                        and  opdx52.line = 52   
   left join Anthem_AMB_DX_query opdx53 on opdx53.ref# = c.ref#      
                       and opdx53.date_of_service_from = c.date_of_service_from
                       and  opdx53.date_of_service_thru = c.date_of_service_thru  
                       and   opdx53.procedure_code = c.procedure_code
                        and  opdx53.line = 53   
   left join Anthem_AMB_DX_query opdx54 on opdx54.ref# = c.ref#      
                       and opdx54.date_of_service_from = c.date_of_service_from
                       and  opdx54.date_of_service_thru = c.date_of_service_thru  
                       and   opdx54.procedure_code = c.procedure_code
                        and  opdx54.line = 54   
   left join Anthem_AMB_DX_query opdx55 on opdx55.ref# = c.ref#      
                       and opdx55.date_of_service_from = c.date_of_service_from
                       and opdx55.date_of_service_thru = c.date_of_service_thru  
                       and opdx55.procedure_code = c.procedure_code
                        and  opdx55.line = 55 
   left join Anthem_AMB_DX_query opdx56 on opdx56.ref# = c.ref#      
                       and opdx56.date_of_service_from = c.date_of_service_from
                       and  opdx56.date_of_service_thru = c.date_of_service_thru  
                       and  opdx56.procedure_code = c.procedure_code
                        and opdx56.line = 56
   left join Anthem_AMB_DX_query opdx57 on opdx57.ref# = c.ref#      
                       and opdx57.date_of_service_from = c.date_of_service_from
                       and  opdx57.date_of_service_thru = c.date_of_service_thru  
                       and  opdx57.procedure_code = c.procedure_code
                        and opdx57.line = 57   
     left join Anthem_AMB_DX_query opdx58 on opdx58.ref# = c.ref#      
                       and opdx58.date_of_service_from = c.date_of_service_from
                       and opdx58.date_of_service_thru = c.date_of_service_thru  
                       and opdx58.procedure_code = c.procedure_code
                        and  opdx58.line = 58 
   left join Anthem_AMB_DX_query opdx59 on opdx59.ref# = c.ref#      
                       and opdx59.date_of_service_from = c.date_of_service_from
                       and  opdx59.date_of_service_thru = c.date_of_service_thru  
                       and  opdx59.procedure_code = c.procedure_code
                        and opdx59.line = 59
   left join Anthem_AMB_DX_query opdx60 on opdx60.ref# = c.ref#      
                       and opdx60.date_of_service_from = c.date_of_service_from
                       and  opdx60.date_of_service_thru = c.date_of_service_thru  
                       and  opdx60.procedure_code = c.procedure_code
                        and opdx60.line = 60   
 left join Anthem_AMB_DX_query opdx61 on opdx61.ref# = c.ref#      
                       and opdx61.date_of_service_from = c.date_of_service_from
                       and opdx61.date_of_service_thru = c.date_of_service_thru  
                       and opdx61.procedure_code = c.procedure_code
                        and  opdx61.line = 61 
   left join Anthem_AMB_DX_query opdx62 on opdx62.ref# = c.ref#      
                        and opdx62.date_of_service_from = c.date_of_service_from
                       and  opdx62.date_of_service_thru = c.date_of_service_thru  
                       and  opdx62.procedure_code = c.procedure_code
                        and opdx62.line = 62
   left join Anthem_AMB_DX_query opdx63 on opdx63.ref# = c.ref#      
                       and opdx63.date_of_service_from = c.date_of_service_from
                       and  opdx63.date_of_service_thru = c.date_of_service_thru  
                       and  opdx63.procedure_code = c.procedure_code
                        and opdx63.line = 63                         
 left join Anthem_AMB_DX_query opdx64 on opdx64.ref# = c.ref#      
                       and opdx64.date_of_service_from = c.date_of_service_from
                       and opdx64.date_of_service_thru = c.date_of_service_thru  
                       and opdx64.procedure_code = c.procedure_code
                        and  opdx64.line = 64 
   left join Anthem_AMB_DX_query opdx65 on opdx65.ref# = c.ref#      
                        and opdx65.date_of_service_from = c.date_of_service_from
                       and  opdx65.date_of_service_thru = c.date_of_service_thru  
                       and  opdx65.procedure_code = c.procedure_code
                        and opdx65.line = 65
   left join Anthem_AMB_DX_query opdx66 on opdx66.ref# = c.ref#      
                       and opdx66.date_of_service_from = c.date_of_service_from
                       and  opdx66.date_of_service_thru = c.date_of_service_thru  
                       and  opdx66.procedure_code = c.procedure_code
                        and opdx66.line = 66
left join Anthem_AMB_DX_query opdx67 on opdx67.ref# = c.ref#      
                       and opdx67.date_of_service_from = c.date_of_service_from
                       and opdx67.date_of_service_thru = c.date_of_service_thru  
                       and opdx67.procedure_code = c.procedure_code
                        and  opdx67.line = 67 
   left join Anthem_AMB_DX_query opdx68 on opdx68.ref# = c.ref#      
                        and opdx68.date_of_service_from = c.date_of_service_from
                       and  opdx68.date_of_service_thru = c.date_of_service_thru  
                       and  opdx68.procedure_code = c.procedure_code
                        and opdx68.line = 68
   left join Anthem_AMB_DX_query opdx69 on opdx69.ref# = c.ref#      
                       and opdx69.date_of_service_from = c.date_of_service_from
                       and  opdx69.date_of_service_thru = c.date_of_service_thru  
                       and  opdx69.procedure_code = c.procedure_code
                        and opdx69.line = 69                      
left join Anthem_AMB_DX_query opdx70 on opdx70.ref# = c.ref#      
                       and opdx70.date_of_service_from = c.date_of_service_from
                       and opdx70.date_of_service_thru = c.date_of_service_thru  
                       and opdx70.procedure_code = c.procedure_code
                        and  opdx70.line = 70 
   left join Anthem_AMB_DX_query opdx71 on opdx71.ref# = c.ref#      
                        and opdx71.date_of_service_from = c.date_of_service_from
                       and  opdx71.date_of_service_thru = c.date_of_service_thru  
                       and  opdx71.procedure_code = c.procedure_code
                        and opdx71.line = 71
   left join Anthem_AMB_DX_query opdx72 on opdx72.ref# = c.ref#      
                       and opdx72.date_of_service_from = c.date_of_service_from
                       and  opdx72.date_of_service_thru = c.date_of_service_thru  
                       and  opdx72.procedure_code = c.procedure_code
                        and opdx72.line = 72                             

