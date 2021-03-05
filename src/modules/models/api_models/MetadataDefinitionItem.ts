/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { IMetadataDefinitionItem } from "../../../addons/package/base";

export default class MetadataDefinitionItem implements IMetadataDefinitionItem {

    // ---- SF Metadata APi response ---- ///
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

    // --- Additional ---- //
    rawMetadata: any;

    get objectName(): string {
        if (this.rawMetadata) {
            switch (this.type) {
                case 'Flow':
                    let mt = this.rawMetadata.processMetadataValues.find(item => item.name == 'ObjectType');
                    if (mt) {
                        return mt.value.stringValue;
                    }
                    break;

            }
        }
        return '';
    }

    get triggerType(): string {
        if (this.rawMetadata) {
            switch (this.type) {
                case 'Flow':
                    let mt = this.rawMetadata.processMetadataValues.find(item => item.name == 'TriggerType');
                    if (mt) {
                        return mt.value.stringValue;
                    }
                    break;
            }
        }
        return '';
    }

    get shortName() {
        switch (this.type) {
            default:
                return this.fullName;

        }
    }

    constructor(init?: Partial<MetadataDefinitionItem>) {
        if (init) {
            Object.assign(this, init);
            this.lastModifiedDate = typeof this.lastModifiedDate == 'string'
                && new Date(this.lastModifiedDate) || this.lastModifiedDate;
            this.createdDate = typeof this.createdDate == 'string'
                && new Date(this.createdDate) || this.createdDate;
        }
    }
}
