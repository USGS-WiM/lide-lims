import { Injectable } from '@angular/core';

import { IAnalysisBatchSummary } from './analysis-batches/analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batches/analysis-batch';
import { ITarget } from './targets/target';

@Injectable()
export class APP_UTILITIES {

	// SAMPLE_FORM_CONFIG is the config JSON object for the sample form, based on matrix selection
	// object keys match the matrix ID
	public static get SAMPLE_FORM_CONFIG(): Object {
		return {
			"6": {
				"matrix_type": false,
				"study": false,
				"sample_type": false,
				"collaborator_sample_id": false,
				"filter_flag": false,
				"secondary_concentration_flag": false,
				"study_site_name": false,
				"sample_description": false,
				"sampler_name": false,
				"sample_notes": false,
				"arrival_date": false,
				"arrival_notes": false,
				"collection_start_date": false,
				"collection_start_time": false,
				"collection_end_date": false,
				"collection_end_time": false,
				"pump_flow_rate": false,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": false,
				"total_volume_sampled_unit_initial": false,
				"post_dilution_volume": true,
				"filter_type": false,
				"filter_born_on_date": true,
				"dissolution_volume": false,
				"elution_notes": true,
				"technician_initials": true,
				"sample_volume_initial": true
			},
			"4": {
				"matrix_type": false,
				"study": false,
				"sample_type": false,
				"collaborator_sample_id": false,
				"filter_flag": false,
				"secondary_concentration_flag": false,
				"study_site_name": false,
				"sample_description": false,
				"sampler_name": false,
				"sample_notes": false,
				"arrival_date": false,
				"arrival_notes": false,
				"collection_start_date": false,
				"collection_start_time": true,
				"collection_end_date": true,
				"collection_end_time": true,
				"pump_flow_rate": true,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": false,
				"total_volume_sampled_unit_initial": false,
				"post_dilution_volume": true,
				"filter_type": true,
				"filter_born_on_date": true,
				"dissolution_volume": true,
				"elution_notes": false,
				"technician_initials": false,
				"sample_volume_initial": false
			},
			"5": {
				"matrix_type": false,
				"study": false,
				"sample_type": false,
				"collaborator_sample_id": false,
				"filter_flag": false,
				"secondary_concentration_flag": false,
				"study_site_name": false,
				"sample_description": false,
				"sampler_name": false,
				"sample_notes": false,
				"arrival_date": false,
				"arrival_notes": false,
				"collection_start_date": false,
				"collection_start_time": true,
				"collection_end_date": true,
				"collection_end_time": true,
				"pump_flow_rate": true,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": true,
				"total_volume_sampled_unit_initial": true,
				"post_dilution_volume": true,
				"filter_type": true,
				"filter_born_on_date": true,
				"dissolution_volume": true,
				"elution_notes": true,
				"technician_initials": true,
				"sample_volume_initial": true
			},
			"3": {
				"matrix_type": false,
				"study": false,
				"sample_type": false,
				"collaborator_sample_id": false,
				"filter_flag": false,
				"secondary_concentration_flag": false,
				"study_site_name": false,
				"sample_description": false,
				"sampler_name": false,
				"sample_notes": false,
				"arrival_date": false,
				"arrival_notes": false,
				"collection_start_date": false,
				"collection_start_time": true,
				"collection_end_date": true,
				"collection_end_time": true,
				"pump_flow_rate": true,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": false,
				"total_volume_sampled_unit_initial": false,
				"post_dilution_volume": false,
				"filter_type": true,
				"filter_born_on_date": true,
				"dissolution_volume": true,
				"elution_notes": true,
				"technician_initials": true,
				"sample_volume_initial": true
			},
			"2": {
				"matrix_type": false,
				"study": false,
				"sample_type": false,
				"collaborator_sample_id": false,
				"filter_flag": false,
				"secondary_concentration_flag": false,
				"study_site_name": false,
				"sample_description": false,
				"sampler_name": false,
				"sample_notes": false,
				"arrival_date": false,
				"arrival_notes": false,
				"collection_start_date": false,
				"collection_start_time": false,
				"collection_end_date": false,
				"collection_end_time": false,
				"pump_flow_rate": true,
				"meter_reading_initial": true,
				"meter_reading_final": true,
				"meter_reading_unit": true,
				"total_volume_sampled_initial": false,
				"total_volume_sampled_unit_initial": false,
				"post_dilution_volume": true,
				"filter_type": true,
				"filter_born_on_date": true,
				"dissolution_volume": true,
				"elution_notes": true,
				"technician_initials": true,
				"sample_volume_initial": true
			},
			"1": {
				"matrix_type": false,
				"study": false,
				"sample_type": false,
				"collaborator_sample_id": false,
				"filter_flag": false,
				"secondary_concentration_flag": false,
				"study_site_name": false,
				"sample_description": false,
				"sampler_name": false,
				"sample_notes": false,
				"arrival_date": false,
				"arrival_notes": false,
				"collection_start_date": false,
				"collection_start_time": false,
				"collection_end_date": false,
				"collection_end_time": false,
				"pump_flow_rate": true,
				"meter_reading_initial": false,
				"meter_reading_final": false,
				"meter_reading_unit": false,
				"total_volume_sampled_initial": true,
				"total_volume_sampled_unit_initial": true,
				"post_dilution_volume": true,
				"filter_type": false,
				"filter_born_on_date": false,
				"dissolution_volume": true,
				"elution_notes": false,
				"technician_initials": false,
				"sample_volume_initial": false
			}
		}
	}

	public static get INHIBITIONS_PER_SAMPLE_ENDPOINT() {
		return [
			{
				"id": 14,
				"sample_type": 5,
				"sample_description": "Excepteur eu commodo occaecat est excepteur nisi fugiat pariatur cupidatat nulla elit nisi nostrud irure.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-06-27",
				"modified_by": "admin"
			},
			{
				"id": 4,
				"sample_type": 3,
				"sample_description": "Cupidatat ex adipisicing in est id amet tempor in enim voluptate est elit enim minim.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-06-27",
				"modified_by": "admin"
			},
			{
				"id": 7,
				"sample_type": 3,
				"sample_description": "Nulla proident labore cillum laborum culpa eu magna.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-17",
				"modified_by": "admin"
			},
			{
				"id": 8,
				"sample_type": 5,
				"sample_description": "Officia eiusmod excepteur dolore consequat adipisicing fugiat reprehenderit nostrud nostrud labore pariatur nulla ut.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-17",
				"modified_by": "admin"
			},
			{
				"id": 9,
				"sample_type": 3,
				"sample_description": "Commodo sunt et et excepteur occaecat magna voluptate exercitation laboris exercitation pariatur veniam magna.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-17",
				"modified_by": "admin"
			},
			{
				"id": 10,
				"sample_type": 5,
				"sample_description": "Ex nostrud sunt exercitation sit velit irure consequat mollit.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-17",
				"modified_by": "admin"
			},
			{
				"id": 12,
				"sample_type": 1,
				"sample_description": "Id eu excepteur Lorem nisi ut occaecat nostrud nulla officia tempor do consequat.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-17",
				"modified_by": "admin"
			},
			{
				"id": 3,
				"sample_type": 1,
				"sample_description": "Incididunt voluptate laborum est ipsum. TEST",
				"inhibitions": [
					{
						"id": 1,
						"sample": 3,
						"analysis_batch": 1,
						"inhibition_date": "2017-10-10",
						"type": "RNA",
						"dilution_factor": null,
						"created_date": "2017-10-10",
						"created_by": "admin",
						"modified_date": "2017-10-10",
						"modified_by": "admin"
					}
				],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-18",
				"modified_by": "admin"
			},
			{
				"id": 5,
				"sample_type": 4,
				"sample_description": "Eu voluptate in magna aliqua cupidatat ad qui laborum adipisicing irure sunt.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-18",
				"modified_by": "admin"
			},
			{
				"id": 11,
				"sample_type": 4,
				"sample_description": "Elit tempor mollit aliquip est amet sint esse magna ea laboris.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-18",
				"modified_by": "admin"
			},
			{
				"id": 13,
				"sample_type": 3,
				"sample_description": "Ea veniam do mollit fugiat proident do aute velit id non.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-08-18",
				"modified_by": "admin"
			},
			{
				"id": 6,
				"sample_type": 3,
				"sample_description": "Commodo amet anim deserunt sunt cillum do esse officia mollit minim minim est est deserunt.",
				"inhibitions": [],
				"created_date": "2017-06-27",
				"created_by": "admin",
				"modified_date": "2017-11-08",
				"modified_by": "admin"
			}
		]

	}
}
