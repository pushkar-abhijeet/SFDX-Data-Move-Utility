/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


import { CORE_MESSAGES } from "../../../engine/messages/core";
import SfdmuRunAddonBase from "../../../engine/sfdmu-run/sfdmuRunAddonBase";
import IPluginExecutionContext from "../../../package/base/IPluginExecutionContext";

export default class CoreOnAfter extends SfdmuRunAddonBase {

    async onExecute(context: IPluginExecutionContext, args : any) : Promise<void>  {

        this.runtime.writeStartMessage(this);

        // TODO: Implement the core OnBefore functionality here   
        this.systemRuntime.$$writeCoreInfoMessage(this, CORE_MESSAGES.Processing);

        this.runtime.writeFinishMessage(this);  
    }

}