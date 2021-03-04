/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { ScriptOrg } from "../../models";

/**
 * The class to implement various of operation
 * with object metadata
 *
 * @export
 * @class MetadataApi
 */
export class MetadataApi {

    org : ScriptOrg;

    constructor (org: ScriptOrg){
        this.org = org;        
    }

    

}