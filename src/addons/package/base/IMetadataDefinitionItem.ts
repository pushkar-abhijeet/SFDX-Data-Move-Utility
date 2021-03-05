/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


 export default interface IMetadataDefinitionItem {
    length: number;
    createdById: string;
    createdByName: string;
    createdDate: Date;
    fileName: string;
    fullName: string;
    id: string;
    lastModifiedById: string;
    lastModifiedByName: string;
    lastModifiedDate: Date;
    manageableState: string;
    namespacePrefix: string;
    type: string;
    

    rawMetadata: any;
    readonly shortName: string;
    objectName: string;
    triggerType: string;
 }