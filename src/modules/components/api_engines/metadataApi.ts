/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { ScriptOrg } from "../../models";
import { MetadataDefinition, MetadataDefinitionItem } from "../../models/api_models";
import { Common } from "../common_components/common";
import { CONSTANTS } from "../common_components/statics";



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
        return new Promise<MetadataDefinition>(resolve => {
            let conn = this.org.getConnection();
            let types = [{ type, folder: null }];
            conn.metadata.list(types, this.org.connectionData.apiVersion, (err: any, rawMetadatas: any[]) => {
                if (err) {
                    resolve(new MetadataDefinition({
                        errorMessage: err,
                        type
                    }));
                    return;
                }
                rawMetadatas = [].concat(rawMetadatas || []);
                let response = new MetadataDefinition({
                    data: rawMetadatas
                        .filter(rawMetadata => rawMetadata.manageableState == 'unmanaged')
                        .map(rawMetadata => new MetadataDefinitionItem(rawMetadata)),
                    type
                });
                resolve(response);
            });
        });

    }

    async readMetadata(metadataDefinition: MetadataDefinition): Promise<MetadataDefinition> {

        let _self = this;

        return new Promise<MetadataDefinition>(async resolve => {

            // -------------- Helper Functions ---------------- //
            const readMetadata = async (metadataItems: MetadataDefinitionItem[]): Promise<void> => {
                return new Promise<void>(resolve => {
                    let conn = _self.org.getConnection();
                    let metaFullNameToMetaMap = Common.arrayToMapByProperty(metadataItems, 'fullName');
                    conn.metadata.read(metadataDefinition.type, [...metaFullNameToMetaMap.keys()], function (err: any, rawMetadatatas: any[]) {
                        if (err) {
                            metadataDefinition.errorMessage = [].concat(metadataDefinition.errorMessage, err).join(';');
                            resolve();
                            return;
                        }
                        rawMetadatatas = [].concat(rawMetadatatas);
                        for (let i = 0; i < rawMetadatatas.length; i++) {
                            const rawMetadata = rawMetadatatas[i];
                            let metadataItem: MetadataDefinitionItem = <any>metaFullNameToMetaMap.get(rawMetadata.fullName);
                            if (metadataItem) {
                                metadataItem.rawMetadata = rawMetadata;
                            }
                        }
                        resolve();
                    });
                });
            };
            // ---------------------------------------------


            // Check for parameteras
            if (!metadataDefinition || metadataDefinition.data.length == 0) {
                resolve(metadataDefinition);
                return;
            }

            // Detect how many metadata items it can read at once
            let itemsPerApiCall = CONSTANTS.MAX_READ_METADATA_DEFAULT_CHUNK_SIZE;

            switch (metadataDefinition.type) {
                // Flow allows retrieving only one item per metadata read call...
                case 'Flow':
                    itemsPerApiCall = 1;
                    break;
            }

            // Split metadata items into chunks + create functions
            let metadataChunkedItems = Common.chunkArray(metadataDefinition.data, itemsPerApiCall);
            let fns = metadataChunkedItems.map(item => async () => await readMetadata(item));

            // Read metadata
            await Common.parallelExecAsync(fns, _self, CONSTANTS.MAX_READ_METADATA_PARALLEL_THREADS);

            // Return
            resolve(metadataDefinition);

        });

    }



}