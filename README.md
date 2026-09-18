# PRD-Ginie : AI-Powered Product Documentation Assistant
Project files and Documentation for Project - PRD Genie — AI-Powered Product Documentation Assistant.

How to use this guide -
This document explains the folder structure and list of documents submitted for the completion of Capstone Project Submission of project - "PRD Genie: AI-Powered Product Documentation Assistant"

Contents

** Root Folder 
		1. Read me File - This document that explains the structure of submitted documents
		2. PRD Genie.json - Eported JSON file of the n8n Workflow  
		3. PRD Genie — AI-Powered Product Documentation Assistant.pptx - A presentation file capturing the essential extracts from all of the submitted documents 

**Prompts & JS code - This folder contains the final prompts for all the 7 agents in the n8n workflow and 1 for the Langfuse evaluator. 
		1.  Requirement Extractor Final Prompt.txt
		2.  Gap Analyizer Final Prompt.txt
		3.  Langfuse Evaluator Prompt.txt
		4.  PRD Generator Final Prompt.txt
		5.  Critique Agent Final Prompt.txtUser Story Finalizer Final Prompt.txt		
		6.  Resolver Agent Final Prompt.txt
		7.  Story Break Down Agent Final Prompt.txt
		8.  User Story Finalizer Final Prompt.txt
		9.  Story Evaluator.js
		10. Requirement Aggregator.js
		11. Validate and Correct Gruonding.js
		12. Code Node for Langfuse Payload.js


**Resources - This folder conatins all the source files and resources that was provided to build the project. 
		1. eval_prdgenie_inputs.txt
		2. prd_template.md
		3. sample_meeting_transcripts.txt
		4. sample_product_brief.txt
		5. stakeholder_notes.txt
		6. Problem Statement - PRD Genie_ AI-Powered Product Documentation Assistant.pdf


**Response to Questions - This folder includes the formal solution writeup for the question inthe problem statement for PRD Genie
		1. PRD_Genie_Ideation.docx
		2. PRD_Genie_Program_Charter.docx
		3. PRD_Genie_Build.Docx
		4. PRD_Genie_Reflection.docx
		
		
**ScreenShots - This folder conatins all the relevant screenshots for the project submission, it includes :
		1. Full Canvas.jpg
		2. Working Canvas.jpg	
		3. Full Execution n8n Log.jpg
		4. Langfuse Eavluator.jpg
		5. Langfuse Tracing.jpg

**Solutioning and Development Progress - This includes the documentation of the development journey of the crticals parts of the workflow this includes the progress made for each of the agents and faliures observed and fixes made in various iterations to reach the final state.
		1. Extractor Agent Validation.docx
		2. Gap Analyzer Validations.docx
		3. PRD Generator Validations.docx
		4. Story BreakDown Agent Validation.docx

**Test Cases - This folder contains all the details of the baseline test cases, it includes : 
		1. Test Cases.xlsx - This xlsx file documents the result of all the 12 baseline test cases having the data in following columns :
							 Test CaseID, Test Input, Type, Expected Output Must Contain, Result, Input, Output, "Langfuse Meta Data (Expected Criteria for LLM to judge)" and Model reasoning 
	
		2. Expected Criteria.txt - This document includes the details of the : 
							Filename - (Sample input files generated using LLM to test the baseline Test Cases), 
							Batch_id - to be used as the input for the batch selector node in the workflow that flows all the way to Langfuse for evals
							Expected_criteria - this gives a breif of the test case and the expected must contains of the output.
				
		3. Sample Input Files S1 through S7 that suffices the testing of all the 12 baseline test cases - 
							1. S1_T1.txt
					        2. S2_T2_T7.txt
					        3. S3_T3_T4.txt
					        4. S4_T5_T10.txt
					        5. S5_T6.txt
					        6. S6_T8.txt
					        7. S7_T9.txt
		 
