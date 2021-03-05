
/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { MetadataDefinitionItem } from ".";
import { GeneralDataResponse } from "..";
import { IMetadataDefinition } from "../../../addons/package/base";


export default class MetadataDefinition extends GeneralDataResponse implements IMetadataDefinition {

    constructor(init?: Partial<MetadataDefinition>) {
        super(init);
        if (init) {
            Object.assign(this, init);
        }
    }
    type: string;
    data: Array<MetadataDefinitionItem> = new Array<MetadataDefinitionItem>();
}
