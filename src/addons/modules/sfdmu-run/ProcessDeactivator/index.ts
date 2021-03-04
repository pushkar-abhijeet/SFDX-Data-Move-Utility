/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


import { Common } from "../../../../modules/components/common_components/common";

import { CONSTANTS } from "../../../../modules/components/common_components/statics";
import { CORE_MESSAGES } from "../../../engine/messages/core";
import SfdmuContentVersion from "../../../engine/sfdmu-run/sfdmuContentVersion";
import SfdmuRunAddonBase from "../../../engine/sfdmu-run/sfdmuRunAddonBase";
import { API_ENGINE, OPERATION } from "../../../package/base/enumerations";
import IPluginExecutionContext from "../../../package/base/IPluginExecutionContext";

interface IOnExecuteArguments {
    processes: Array<IProcess>;
}

interface IProcess {
    type: 'Flow' | 'Trigger' | 'ValidataionRule' | 'LookupFilter' | 'All';
    processNames: Array<string>;
    relatedObjects: Array<string>;
    mode: 'Off' | 'On' | 'All'
}

export default class ProcessDeactivator extends SfdmuRunAddonBase {

    async onExecute(context: IPluginExecutionContext, args: IOnExecuteArguments): Promise<void> {

        let _self = this;

        this.runtime.writeStartMessage(this);

        this.systemRuntime.$$writeCoreInfoMessage(this, CORE_MESSAGES.Preparing);

        if (this.runtime.getOrgInfo(false).isFile) {
            // File target -> error
            this.systemRuntime.$$writeCoreWarningMessage(this, CORE_MESSAGES.ProcessDeactivator_TargetIsFileWarning);
            this.runtime.writeFinishMessage(this);
            return;
        }

        // Finding processes to activate/deactivate --------------------------
        let objectList = !context.objectName ?
            this.runtime.pluginJob.tasks
                .filter(task => task.operation != OPERATION.Delete
                    && task.operation != OPERATION.Readonly).map(task => task.sObjectName)
            : [context.objectName];

        // TEMP ---:::
        let flows = this.runtime.listMetadata('Flow', objectList);




        this.runtime.writeFinishMessage(this);

        // ---------- Local Helpers ----------------- //

    }

}