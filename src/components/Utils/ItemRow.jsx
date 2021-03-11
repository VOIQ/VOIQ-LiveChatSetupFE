import React, {useState} from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

const ItemRow = (props) => {
  const [item, setItem] = useState(
    props.item[props.attributeName] || ""
  );

  const onItemChange = (event) => {
    setItem(event.target.value);
  }

  const getHelperText = (item) => {
    if (props.helperText) {
      return item.length + "/" + props.maxLength;
    } else if (props.item.error_message) {
      return props.item.error_message;
    } else {
      return null;
    }
  }

  return (
    <Grid container direction="row">
      <Grid item xs={10}>
        <TextField
          error={!!props.item.error_message}
          multiline={props.multiline}
          rowsMax={props.rowsMax}
          id={"item-" + props.item.id}
          value={item}
          onBlur={props.onItemBlur}
          onChange={onItemChange}
          className="item-text-field"
          inputProps={props.maxLength && { maxLength: props.maxLength }}
          helperText={getHelperText(item)}
        />
      </Grid>
      { props.optionalIcon && 
        <Grid item xs={1}>
          { props.item.should_show_optional_icon && React.createElement(props.optionalIcon) }
        </Grid>
      }
      <Grid item xs={1}>
        <IconButton aria-label="delete" className="delete-item-row" onClick={() => {props.onRemoveItem(props.item.id)}}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default ItemRow;
