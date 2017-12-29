import {IReverseTranscriptionSubmission} from '../reverse-transcriptions/reverse-transcription-submission'

export interface IExtractionBatchSubmission {
    analysis_batch: number;
    extraction_volume: number;
    elution_volume: number;
    extraction_method: number;
    extraction_date: string;
    reextraction: number;
    sample_dilution_factor: number;
    qpcr_template_volume: number;
    qpcr_reaction_volume: number;
    qpcr_date: string;
    new_rt: Object;
    new_replicates: {
        target: number;
        count: number;
    }[];
    new_extractions: Object[];
}
