import { Injectable } from '@angular/core';
import {Campaign, CrawlCampaign, CampaignPermisson, Page} from'./../../../models/create-campaign.model'
import {STEPS} from './../../../models/Step.model';
import {WorkflowService} from './../../../services/create-campaign/workflow/workflow.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  campaign : Campaign = new Campaign();
  crawlCampaign: CrawlCampaign = new CrawlCampaign();
  campaignPermisson: CampaignPermisson = new CampaignPermisson();
  nav_bar : Page = new Page()
  constructor(private workflowService : WorkflowService) { }



  getPage(){
    return this.nav_bar.page;
  }

  setPage(value: string){
    this.nav_bar.page = value;
  }

  getCrawlCampaignWithoutStatus(){
    return this.crawlCampaign;
  }


  getCampaignPermisson(){
    return this.campaignPermisson;
  }
  getCampaign(){
    this.workflowService.setStep("info", false);
    return this.campaign;
  }
  getCrawlCampaign(){
    this.workflowService.setStep("info", false);
    return this.crawlCampaign;
  }

  setCampaginPermisson(data : CampaignPermisson){
    this.setPermisson();
    this.campaignPermisson = data;
  }
  setCampaign(data : Campaign){
    this.campaign = data;
    this.workflowService.setStep("info", true);

  }
  setCrawlCampaign(data: CrawlCampaign){
    this.crawlCampaign = data;
    this.workflowService.setStep("start", true)
  }
  setPermisson(){
    this.workflowService.setStep("permisson", true)
  }
  setFinished(){
    this.workflowService.setStep("finished", true)
  }
  CheckStep(value: string){
    return this.workflowService.checkStep(value);
  }
}
