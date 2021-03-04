/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Holds metadata description
 *
 * @export
 * @interface IMetadataDescription
 */
export default interface IMetadataDescription {
    /**
     * The short name of the metadata
     *
     * @type {string}
     * @memberof IMetadataDescription
     */
    name: string;

    /**
     * The full name of the metadata
     *
     * @type {string}
     * @memberof IMetadataDescription
     */
    fullName: string;

    /**
     * The metadata type name, like Flow, ApexTrigger etc
     *
     * @type {string}
     * @memberof IMetadataDescription
     */
    type: string;

    /**
     * The name of object twhich triggers this process
     * or the object which is related to this metadata
     *
     * @type {string}
     * @memberof IMetadataDescription
     */
    objectName: string;

    /**
     * The full metadata data
     *
     * @type {*}
     * @memberof IMetadataDescription
     */
    data: any;
}


