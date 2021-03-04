/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { ScriptOrg } from "../../models";
import { MetadataDefinition, MetadataDefinitionItem } from "../../models/api_models";



/**
 * The class to implement various of operation
 * with object metadata
 *
 * @export
 * @class MetadataApi
 */
export class MetadataApi {

    org: ScriptOrg;

    constructor(org: ScriptOrg) {
        this.org = org;
    }

    async listMetadata(type: string): Promise<MetadataDefinition> {
        let conn = this.org.getConnection();
        return new Promise<MetadataDefinition>((resolve, reject) => {
            let types = [{ type, folder: null }];
            conn.metadata.list(types, this.org.connectionData.apiVersion, (err: any, metas: any[]) => {
                if (err) {
                    resolve(new MetadataDefinition({
                        errorMessage: err
                    }));
                    return;
                }
                metas = [].concat(metas || []);
                let response = new MetadataDefinition({
                    data: metas.filter(meta => meta.manageableState == 'unmanaged').map(meta => new MetadataDefinitionItem(meta))
                });
                resolve(response);
            });
        });
    }



}