import React from 'react';
import Select from 'react-select';

export default function FormSelect(props: any) {

    const {
        className,
        invalid = "false",
        dirty = "false",
        onTurnDirty,
        ...selectProps
    } = props;

    function handleBlur() {
        onTurnDirty(props.name);
    }

    return (

        <div
            className={className}
            data-invalid={invalid}
            data-dirty={dirty}
        >
            <Select
                {...selectProps}
                onBlur={handleBlur}
                
            />
        </div>

    );

}