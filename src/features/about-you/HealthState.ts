import {Health, Symptoms} from "./types";

export class HealthState  {
    // Long-term health conditions
    healthById: Map<string, Health>

    // Regular updates on symptoms
    // TODO: How to store historic records?
    symptomsById: Map<string, Symptoms>
}

