import React from 'react';

import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import ItemRow from "./ItemRow";

const ItemTable = (props) => {
  const underLimit = props.limit ? props.numberOfItems < props.limit : true;
  const itemList = JSON.parse(props.itemList);

  return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {
              itemList && itemList.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <ItemRow
                      multiline={props.multiline}
                      rowsMax={props.rowsMax}
                      voicebotId={props.voicebotId}
                      item={item}
                      index={index}
                      onItemBlur={props.onItemBlur}
                      onRemoveItem={props.onRemoveItem}
                      attributeName={props.attributeName}
                      maxLength={props.maxLength}
                      helperText={props.helperText}
                      optionalIcon={props.optionalIcon}
                    />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        { underLimit &&
          <ListItem
            button
            alignItems="center"
            className={"add-item"}
            onClick={props.addItem}
          >
            <AddIcon/>
          </ListItem>
        }
      </TableContainer>   
  );
}

export default ItemTable;
