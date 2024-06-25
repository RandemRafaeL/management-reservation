import { FormGroup, FormControl } from '@angular/forms';
export class FormGroupFromGQL {
    private readonly formGroup: FormGroup;

    constructor(private document: any) {
        this.formGroup = this.createFormGroupBasedOnGQLDocument();
    }

    private createFormGroupBasedOnGQLDocument(): FormGroup {
        const formControls: Record<string, FormControl> = {};
        const operationDefinition = this.document.definitions.find(
            (definition: any) => definition.kind === 'OperationDefinition'
        );

        if (operationDefinition && operationDefinition.kind === 'OperationDefinition') {
            const selectionSet = operationDefinition.selectionSet.selections[0];
            if (selectionSet && selectionSet.selectionSet) {
                selectionSet.selectionSet.selections.forEach((field: any) => {
                    if (field.kind === 'Field') {
                        const fieldName = field.name.value;
                        formControls[fieldName] = new FormControl('');
                    }
                });
            }
        }

        return new FormGroup(formControls);
    }

    public getFormGroup(): FormGroup {
        return this.formGroup;
    }
}
