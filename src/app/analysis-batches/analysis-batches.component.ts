import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from "@angular/forms/";
import { Wizard } from "clarity-angular";

import { IAnalysisBatchSummary } from './analysis-batch-summary';
import { IAnalysisBatch } from './analysis-batch';
import { IAnalysisBatchDetail } from './analysis-batch-detail';
import { IAliquotSelection } from './aliquot-selection';

import { IStudy } from '../studies/study';
import { ISample } from '../samples/sample';
import { IExtraction } from '../extractions/extraction';
import { IExtractionBatch } from '../extractions/extraction-batch';
import { IInhibition } from '../inhibitions/inhibition';
import { IReverseTranscription } from '../reverse-transcriptions/reverse-transcription';
import { ITarget } from '../targets/target';
import { IExtractionMethod } from '../extractions/extraction-method';
import { IUnit } from '../units/unit';
import { IExtractionBatchSubmission } from '../extractions/extraction-batch-submission';

import { StudyService } from '../studies/study.service';
import { SampleService } from '../samples/sample.service';
import { AnalysisBatchService } from './analysis-batch.service';
import { TargetService } from '../targets/target.service';
import { ExtractionMethodService } from '../extractions/extraction-method.service';
import { UnitService } from '../units/unit.service';

import { APP_UTILITIES } from '../app.utilities';

@Component({
  selector: 'app-analysis-batches',
  templateUrl: './analysis-batches.component.html',
  styleUrls: ['./analysis-batches.component.scss']
})
export class AnalysisBatchesComponent implements OnInit {
  @ViewChild("wizardExtract") wizardExtract: Wizard;

  public showWarning = false;
  rnaTargetsSelected: boolean = false;
  sampleListEditLocked: boolean = false;

  inhibitionsExist: boolean = false;
  submitLoading: boolean = false;

  extractWizardOpen: boolean = false;
  useExistingInhibition: boolean = false;

  allAnalysisBatchSummaries: IAnalysisBatchSummary[];
  allTargets: ITarget[] = [];
  allExtractionMethods: IExtractionMethod[];

  studies: IStudy[];
  units: IUnit[];

  allSamples: ISample[] = [];

  focusAnalysisBatchID: number;
  focusAnalysisBatchData: IAnalysisBatchDetail;

  selectedAnalysisBatchID: number;
  selectedAnalysisBatchData: IAnalysisBatchDetail;

  abSampleList: ISample[] = [];
  abSampleIDList: number[] = [];

  showABEditError: boolean = false;
  showABEditSuccess: boolean = false;


  extractionBatchArray: IExtractionBatch[];


  aliquotSelectionArray: IAliquotSelection[] = [];

  inhibitionsPerSample = [];
  // may not need this abInhibitionCount var, consider removing
  abInhibitionCount = 0;
  abInhibitions: IInhibition[];
  sampleInhibitions: IInhibition[];

  showHideEdit: boolean = false;
  showHideExtractionDetailModal: boolean = false;
  showHideRTDetailModal: boolean = false;
  showHideInhibitionDetailModal: boolean = false;
  showHideTargetDetailModal: boolean = false;
  extractionDetailArray: IExtraction[] = [];
  inhibitionDetailArray: IInhibition[] = [];
  rtDetailArray: IReverseTranscription[] = [];
  targetDetailArray;

  selected = [];
  selectedSamples = [];
  selectedAB: IAnalysisBatchSummary;
  errorMessage: string;

  // booleans for edit AB tabs
  sampleListActive: boolean;
  detailsActive: boolean;

  extractionBatchSubmission: IExtractionBatchSubmission;

  extractForm: FormGroup;
  replicateArray: FormArray;
  extractionArray: FormArray;

  x: boolean = false;

  // edit AB form
  editABForm = new FormGroup({
    id: new FormControl(''),
    analysis_batch_description: new FormControl(''),
    analysis_batch_notes: new FormControl(''),
    samples: new FormControl('')
  });


  // extraction form
  extractionForm = new FormGroup({
    analysis_batch: new FormControl(''),
    extraction_volume: new FormControl(''),
    elution_volume: new FormControl(''),
    extraction_method: new FormControl(''),
    extraction_date: new FormControl(''),
    reextraction: new FormControl(''),
    sample_dilution_factor: new FormControl(''),
    qpcr_template_volume: new FormControl('6'),
    qpcr_reaction_volume: new FormControl('20'),
    qpcr_date: new FormControl(''),
    rt_template_volume: new FormControl(''),
    rt_reaction_volume: new FormControl(''),
    rt_date: new FormControl(''),
    // TODO: make these formarrays(?)
    replicates: new FormControl(''),
    extractions: new FormControl('')
  });

  addRTForm = new FormGroup({
    template_volume: new FormControl(''),
    // set the default units to microliters
    // template_volume_units: new FormControl('4'),
    reaction_volume: new FormControl(''),
    // set the default units to microliters
    // reaction_volume_units: new FormControl('4'),
    rt_date: new FormControl('')
  })

  // add inhibition form
  createInhibitionForm = new FormGroup({
    dna: new FormControl(''),
    rna: new FormControl(''),
    inhibition_date: new FormControl('')
  })

  applyInhibition_batchForm = new FormGroup({
    dnaInhibition: new FormControl(''),
    rnaInhibition: new FormControl(''),
    inhibition_date: new FormControl('')
  })

  buildExtractForm() {
    this.extractForm = this.formBuilder.group({
      analysis_batch: ['', Validators.required],
      extraction_volume: ['', Validators.required],
      elution_volume: ['', Validators.required],
      extraction_method: ['', Validators.required],
      extraction_date: ['', Validators.required],
      reextraction: '',
      sample_dilution_factor: ['', Validators.required],
      qpcr_template_volume: ['6', Validators.required],
      qpcr_reaction_volume: ['20', Validators.required],
      qpcr_date: ['', Validators.required],
      rt: this.formBuilder.group({
        template_volume: ['6', Validators.required],
        reaction_volume: ['20', Validators.required],
        rt_date: ['', Validators.required],
        re_rt: '',
        re_rt_note: ''
      }),
      replicates: this.formBuilder.array([
        this.formBuilder.group({
          target: '',
          count: '2'
        })
      ]),
      extractions: this.formBuilder.array([
        this.formBuilder.group({
          sample: '',
          inhibition_dna: '',
          inhibition_rna: ''
        })
      ])
    });

    this.replicateArray = this.extractForm.get('replicates') as FormArray;
    this.extractionArray = this.extractForm.get('extractions') as FormArray;


  }


  onAliquotSelect(sampleID, aliquotString) {

    for (let sample of this.aliquotSelectionArray) {
      if (sampleID === sample.id) {
        sample.aliquot = aliquotString;
      }
    }

    console.log(this.aliquotSelectionArray);
  }

  constructor(
    private formBuilder: FormBuilder,
    private _studyService: StudyService,
    private _sampleService: SampleService,
    private _analysisBatchService: AnalysisBatchService,
    private _targetService: TargetService,
    private _extractionMethodService: ExtractionMethodService,
    private _unitService: UnitService
  ) {
    this.buildExtractForm();
  }

  ngOnInit() {

    // grab temporary hard-coded sample analysis batch summary data (until web service endpoint is up-to-date)
    // this.allAnalysisBatchSummaries = APP_UTILITIES.ANALYSIS_BATCH_SUMMARY_ENDPOINT;

    // on init, call getTargets function of the TargetService, set results to allTargets var
    this._targetService.getTargets()
      .subscribe(targets => this.allTargets = targets,
      error => this.errorMessage = <any>error);

    // grab temporary hard-coded inhibitionsPerSample object (until web service endpoint is up-to-date)
    // this.inhibitionsPerSample = APP_UTILITIES.INHIBITIONS_PER_SAMPLE_ENDPOINT;

    // on init, call getAnalysisBatchSummaries function of the AnalysisBatchService, set results to the allAnalysisBatches var
    this._analysisBatchService.getAnalysisBatchSummaries()
      .subscribe(analysisBatches => this.allAnalysisBatchSummaries = analysisBatches,
      error => this.errorMessage = <any>error);

    // on init, call getExtractionMethods function of the EXtractionMethodService, set results to allExtractionMethods var
    this._extractionMethodService.getExtractionMethods()
      .subscribe(extractionMethods => this.allExtractionMethods = extractionMethods,
      error => this.errorMessage = <any>error);


    // on init, call getStudies function of the StudyService, set results to the studies var
    this._studyService.getStudies()
      .subscribe(studies => this.studies = studies,
      error => this.errorMessage = <any>error);

    // on init, call getSamples function of the SampleService, set results to the allSamples var
    this._sampleService.getSamples()
      .subscribe(samples => this.allSamples = samples,
      error => this.errorMessage = <any>error);

    // on init, call getUnits function of the UnitService, set results to the units var
    this._unitService.getUnits()
      .subscribe(units => this.units = units,
      error => this.errorMessage = <any>error);
  }

  // wizard button handlers
  public handleDangerClick(): void {
    this.wizardExtract.finish();
  }

  public doCustomClick(buttonType: string): void {
    if ("custom-next" === buttonType) {

      // add the 'count' property to the selected (targets) object
      // set the default count to 2
      this.selected.map((target) => {
        target.count = 2;
        return target;
      });
      // check for RNA targets, set rnaTargetsSelected var to true
      for (let target of this.selected) {
        if (target.nucleic_acid_type === "RNA") {
          this.rnaTargetsSelected = true;
          break;
        }
      }

      // reset the replicate form array controls to a blank array so it doesnt get populated twice
      this.replicateArray.controls = [];
      // loop through selected to create replicates form
      for (let target of this.selected) {

        let formGroup: FormGroup = this.formBuilder.group({
          target: this.formBuilder.control(target.id),
          count: this.formBuilder.control(target.count)
        });
        this.replicateArray.push(formGroup);
      }

      this.x = true;
      this.wizardExtract.next();
    }

    if ("custom-previous" === buttonType) {
      this.wizardExtract.previous();
    }

    if ("custom-danger" === buttonType) {
      this.showWarning = true;
    }

    if ("custom-cancel" === buttonType) {
      this.wizardExtract.cancel();
      this.wizardExtract.reset();
    }
  }

  retrieveABData(abID) {
    // return this._analysisBatchService.getAnalysisBatchData(abID);

    this._analysisBatchService.getAnalysisBatchDetail(abID)
      .subscribe(
      (analysisBatchDetail) => {
        console.log(analysisBatchDetail);
        this.focusAnalysisBatchData = analysisBatchDetail;
        // this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
      },
      error => {
        this.errorMessage = <any>error
      }
      );

    return this.focusAnalysisBatchData;


  }

  retrieveSampleData(sampleID) {
    // this._sampleService.read(sampleID)
    // .subscribe(sampleData =>  this.abSampleList = sampleData,
    // error => this.errorMessage = <any>error);
    // return
  }

  resetAB() {
    this.selected = [];
    this.abSampleList = [];
    this.abInhibitionCount = 0;
    this.abInhibitions = [];
    this.sampleInhibitions = [];

    this.sampleListEditLocked = false;
  }

  createWorksheet() {

  }


  extractAB(selectedAB) {

    this.resetAB();
    this.selectedAnalysisBatchID = selectedAB.id;
    // reset the sample form array controls to a blank array so it doesnt get populated twice
    this.extractionArray.controls = [];

    // get the AB detail
    this._analysisBatchService.getAnalysisBatchDetail(selectedAB.id)
      .subscribe(
      (analysisBatchDetail) => {
        console.log(analysisBatchDetail);
        // this.selectedAnalysisBatchData = analysisBatchDetail;

        // get sample id for each sample in the AB
        // add those to abSampleList array
        if (analysisBatchDetail.samples.length > 0) {

          for (let sampleSummary of analysisBatchDetail.samples) {
            for (let sample of this.allSamples) {
              if (sampleSummary.id === sample.id) {
                this.abSampleList.push(sample);
                this.abSampleIDList.push(sample.id);
                this.aliquotSelectionArray.push({ "id": sample.id, "aliquot": sample.id + '-1' });
              }
            }
          }

          // build the abInhbition array: all inhibitions in the current analysis batch
          // used for the batch level apply select dropdowns
          if (analysisBatchDetail.extractionbatches.length > 0) {
            for (let extractionBatch of analysisBatchDetail.extractionbatches) {
              if (extractionBatch.inhibitions.length > 0) {
                for (let inhibition of extractionBatch.inhibitions) {
                  this.abInhibitions.push(inhibition)
                }

              }
            }
          }

          // call to services to retrieve a list of all inhibitions for each sample in this AB
          this._analysisBatchService.getSampleInhibitions(this.abSampleIDList)
            .subscribe(
            (abSampleInhibitions) => {

              for (let sample of abSampleInhibitions) {

                // populate extractionArray with sample IDs for the selected AB and null inhibition ID value (TBD by user)
                let formGroup: FormGroup = this.formBuilder.group({
                  sample: this.formBuilder.control(sample.id),
                  inhibition_dna: this.formBuilder.control(null),
                  inhibition_rna: this.formBuilder.control(null)
                });
                this.extractionArray.push(formGroup);

                // populate sampleInhibitions with all the inhibitions associated with any sample in this AB
                // used for the sample level apply select dropdowns
                for (let inhibition of sample.inhibitions) {
                  this.sampleInhibitions.push(inhibition)
                }

                // check if any of the samples in the list have inhibitions
                // if so set inhibitionsExists var to true
                if (sample.inhibitions.length > 0) {
                  this.inhibitionsExist = true;
                }
              }

              this.extractWizardOpen = true;


            },
            error => {
              this.errorMessage = <any>error
            }
            )

        } else {

          alert("No samples in this analysis batch. Please add samples before extracting.");
        }

      },
      error => {
        this.errorMessage = <any>error
      }
      );
  }

  resetExtractWizard() {
    this.wizardExtract.reset();
  }

  finishExtractWizard(abID, extractFormValue, rtFormValue, createInhibitionFormValue) {

    this.extractForm.patchValue({
      analysis_batch: abID
    })

    // establish local variables to stoe the rna and dna inhibition IDs that the server returns
    let rnaInhibitionID;
    let dnaInhibitionID;
    // establish local variable for POST to inhibition endpoint
    // Needed because the format of the submission object is distinct from the createInhibitionForm object
    let inhibitionSubmission: Object = {
      "sample": null,
      "analysis_batch": null,
      "inhibition_date": null,
      "nucleic_acid_type": null
    }

    if (this.useExistingInhibition === false) {
      // creating a new inhibition then
      // send a POST to the InhibitionBatch endpoint.The response will contain the new batch record
      // and its children inhibition records (which will each include the sample ID to which they relate).
      // Those new inhibition IDs should be used to populate the local (client-side) extractions.

      // createInhibitionFormValue: {rna: true, dna: false, inhibition_date:"2017-11-14"}

      // inhibitionSubmission.sample

      if (this.createInhibitionForm.value.rna === true) {
        // submit an array of inhibition records, one for each sample, with RNA as nucleic acid type to the inhibition endpoint






      }

      if (this.createInhibitionForm.value.dna === true) {

      }







    } else if (this.useExistingInhibition === true) {

      // Otherwise, if there are existing inhibitions that satisfy the user's needs,
      // then use those existing inhibition IDs when building the extraction objects in the client.

    }

    alert("extract wiz finuto!")

    // Needs:

    // 1: Info for new Inhibition if being done that way, must await response

    // 2: Object for POST to the extraction batch endpoint with:
    // extraction data, replicates object (target and count),
    // and extractions object (sample id, inhibition, rt)

    // 3: Build an object for creating the Extract worksheet (including the Aliquot selections)

    // 4:

    // set the analysis batch ID
    // this.extractionBatchSubmission.analysis_batch = abID;
    // this.extractionBatchSubmission.extraction_method = extractFormValue.extraction_method;
    // this.extractionBatchSubmission.extraction_volume = extractFormValue.extraction_volume;
    // this.extractionBatchSubmission.elution_volume = extractFormValue.elution_volume;
    // this.extractionBatchSubmission.
    // this.extractionBatchSubmission.

    // this.extractionBatchSubmission.reextraction






  }

  removeSample(samplesToRemove) {
    console.log(samplesToRemove);
  }

  showApplyExistingCard() {
    this.useExistingInhibition = true;

  }

  onUnitChange() {

  }

  onSubmit(formID, formValue) {
    switch (formID) {
      case 'editAB': {
        this.submitLoading = true;
        this._analysisBatchService.update(formValue)
          .subscribe(
          (ab) => {
            // TODO: make this work so all AB table updates
            // this.updateSamplesArray(formValue);
            this.editABForm.reset();
            this.submitLoading = false;
            this.showABEditSuccess = true;
          },
          error => {
            this.errorMessage = <any>error;
            this.submitLoading = false;
            this.showABEditError = true;
          }

          )
      }
    }



  }

  //TODO: adjust this function to update the AB Summary array that populates the AB table
  // private updateABArray(newItem) {
  //   let updateItem = this.allSamples.find(this.findIndexToUpdate, newItem.id);

  //   let index = this.allSamples.indexOf(updateItem);

  //   this.allSamples[index] = newItem;
  // }

  // private findIndexToUpdate(newItem) {
  //   return newItem.id === this;
  // }


  openTargetDetails(abID) {

    this.targetDetailArray = [];
    // check if AB ID matches the current focusAnalysisBatchID.
    // This will mean the desired AB data is already stored in the variable and does not need to be retrieved
    if (abID === this.focusAnalysisBatchID) {
      // this.extractionDetailArray = this.focusAnalysisBatchData.extractions;
    } else {
      // set the focusAnalysisBatchID to the AB ID of the just-clicked AB record
      this.focusAnalysisBatchID = abID;
      // call to retrieve AB detail data
      this.focusAnalysisBatchData = this.retrieveABData(abID);
      this.extractionBatchArray = this.focusAnalysisBatchData.extractionbatches;
    }

    // build the target list by looping through the AB extraction batch array and adding all targets to a local array
    for (let extractionbatch of this.extractionBatchArray) {
      for (let target of extractionbatch.targets) {
        this.targetDetailArray.push(target);
      }
    }
    // show the inhibition details modal if not showing already
    if (this.showHideTargetDetailModal === false) {
      this.showHideTargetDetailModal = true;
    }

  }

  updateABSampleList(editABFormValue, selected) {
    // grab the selected array and patch it in as the samples array for the editABForm
    let samples = [];
    for (let sample of selected) {
      samples.push(sample.id);
    }
    this.editABForm.patchValue({
      samples: samples
    });
    this.onSubmit('editAB', this.editABForm.value);
  }

  editAB(selectedAB) {

    this.resetAB();
    if (selectedAB.extraction_count > 0) {
      this.sampleListEditLocked = true;
    }


    // call to retrieve AB detail data


    this._analysisBatchService.getAnalysisBatchDetail(selectedAB.id)
      .subscribe(
      (analysisBatchDetail) => {
        console.log(analysisBatchDetail);
        this.selectedAnalysisBatchData = analysisBatchDetail;

        if (this.selectedAnalysisBatchData.samples.length > 0) {
          // get sample id for each sample in the AB
          // add those to selected array
          for (let sampleSummary of this.selectedAnalysisBatchData.samples) {
            for (let sample of this.allSamples) {
              if (sampleSummary.id === sample.id) {
                this.abSampleList.push(sample);
                this.abSampleIDList.push(sample.id);
              }
            }
          }
        } else {

        }
        this.selected = this.abSampleList;

        this.editABForm.setValue({
          id: selectedAB.id,
          analysis_batch_description: selectedAB.analysis_batch_description,
          analysis_batch_notes: selectedAB.analysis_batch_notes,
          samples: this.abSampleIDList
        });

        // show the edit analysis batch modal if not showing already
        if (this.showHideEdit === false) {
          this.showHideEdit = true;
        }
      },
      error => {
        this.errorMessage = <any>error
      }
      );



  }
}
