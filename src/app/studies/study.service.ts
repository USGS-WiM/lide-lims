import { Injectable } from '@angular/core';
import { IStudy } from './study';

@Injectable()
export class StudyService {

  getStudies(): IStudy[] {
    return [
              {
              "study_id": 10000,
              "study_name": "Iowa Well Monitoring Study",
              "study_desc": "water quality study of wells in Iowa",
              "insert_date": "2013-03-05T06:00:00.000Z",
              "insert_user": "afirnstahl",
              "update_date": "2017-05-04T21:34:59.524Z",
              "update_user": ""
              },
              {
              "study_id": 10001,
              "study_name": "EPA Distribution Study",
              "study_desc": "EPA funded study of manure runoff",
              "insert_date": "2012-01-12T06:00:00.000Z",
              "insert_user": "sspencer",
              "update_date": "2017-05-04T21:34:59.524Z",
              "update_user": ""
              },
              {
              "study_id": 10002,
              "study_name": "MDH Storm Water Irrigation",
              "study_desc": "With MDH and U of MN.  First samples Oct 2016",
              "insert_date": "2016-10-07T05:00:00.000Z",
              "insert_user": "jpstokdyk",
              "update_date": null,
              "update_user": ""
              },
              {
              "study_id": 10003,
              "study_name": "Storm Water UWM",
              "study_desc": "Minnesota urban runoff study",
              "insert_date": "2017-05-04T21:34:59.524Z",
              "insert_user": "legacy data upload",
              "update_date": "2017-05-04T21:34:59.524Z",
              "update_user": ""
              },
              {
              "study_id": 10004,
              "study_name": "GLRI",
              "study_desc": "great lakes restoration funds",
              "insert_date": "2017-05-04T21:34:59.524Z",
              "insert_user": "legacy data upload",
              "update_date": "2017-05-04T21:34:59.524Z",
              "update_user": ""
              },
              {
              "study_id": 10005,
              "study_name": "Iowa DNR Beach Study 2016",
              "study_desc": "2016 Iowa DNR beach study. Claire Hruby is PI from Iowa DNR. First sample April 2016.",
              "insert_date": "2017-05-04T21:34:59.524Z",
              "insert_user": "afirnstahl",
              "update_date": "2017-05-04T21:34:59.524Z",
              "update_user": ""
              },
            {
              "study_id": 10006,
              "study_name": "Kewuanee County Study",
              "study_desc": "Samples from two small 2014 samplings, but mainly a 2016-2017 study with multiple 30 sample random sampling events and autosampler samples.",
              "insert_date": "2014-05-14T05:00:00.000Z",
              "insert_user": "sspencer",
              "update_date": "2015-11-16T06:00:00.000Z",
              "update_user": "afirnstahl"
            }
]

  }

  constructor() { }

}
