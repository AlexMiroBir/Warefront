import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {MenuItem, Select} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import {useSelector} from "react-redux";

import "./some.css" // at the request of the library, these classes are needed for icons

const ItemSuppliersTable = ({suppliers, addItemSupplier, updateItemSuppliers, delItemSupplier}) => {


    const itemData = useSelector(state => state.Items.ItemData)
    const allSuppliers = useSelector(state => state.Suppliers.Suppliers)


    const [data, setData] = useState([]);


    useEffect(() => {
        const arr = []

        if (suppliers) {
            suppliers.forEach(supplier => {
                if (allSuppliers.find(sup => sup.Id == supplier.Supplier_ID)) {
                    arr.push({
                        id: supplier.Id,
                        supplier: allSuppliers.find(sup => sup.Id == supplier.Supplier_ID).Name,
                        serial_number: supplier.Supplier_SN,
                        description: allSuppliers.find(sup => sup.Id === supplier.Supplier_ID).Description,
                        phone: allSuppliers.find(sup => sup.Id === supplier.Supplier_ID).Phone,
                        contact: allSuppliers.find(sup => sup.Id === supplier.Supplier_ID).Contact_Name,
                    })
                }
            })

        }
        setData([...arr])
    }, [suppliers])



    return (
        <div className="App">
            <div style={{maxWidth: "100%", paddingTop: "12px"}}>
                <MaterialTable
                    onKeyDown={(e) => e.stopPropagation()}
                    onKeyUp={(e) => e.stopPropagation()}
                    columns={[

                        {
                            title: "Supplier",
                            field: "supplier",
                            editComponent: editProps => (
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={e => editProps.onChange(e.target.value)}
                                    defaultValue={''}
                                >
                                    {allSuppliers.map(supp =>
                                        <MenuItem key={supp.Name} value={supp.Name}>{supp.Name}</MenuItem>
                                    )}

                                </Select>
                            )
                        },
                        {title: "Serial Number", field: "serial_number"},
                        {title: "Description", field: "description", editable: 'never'},
                        {title: "Phone", field: "phone", editable: 'never'},
                        {title: "Contact", field: "contact", editable: 'never'},


                    ]}
                    data={data}
                    title={`New suppliers`}
                    options={{
                        exportButton: true,
                        search: false,
                        pageSize: 3,
                        emptyRowsWhenPaging: true,
                        pageSizeOptions: [3, 5, 7],

                    }}
                    icons={{
                        Add: props => <AddIcon/>,
                        Edit: props => <EditIcon/>,
                        Delete: props => <DeleteIcon/>,
                        Clear: props => <DeleteIcon/>,
                        Check: props => <CheckIcon/>,
                        Search: props => <SearchIcon/>,
                        ResetSearch: props => <DeleteIcon/>
                    }}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    newData.Id = -1
                                    newData.Inventory_ID = itemData.Id

                                    resolve(addItemSupplier(newData))
                                }, 1000);
                            }),

                        //
                        // onRowUpdate: (newData, oldData) =>
                        //     new Promise((resolve, reject) => {
                        //         setTimeout(() => {
                        //             const dataUpdate = [...data];
                        //             const index = oldData.tableData.id;
                        //             newData.Id = -1
                        //             newData.Supplier_ID = itemData.Id
                        //             dataUpdate[index] = newData;
                        //
                        //
                        //             resolve(updateItemSuppliers(dataUpdate));
                        //         }, 1000);
                        //     }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
                                    const index = oldData.tableData.id;

                                    resolve(delItemSupplier(index));
                                }, 1000);
                            }),
                    }}
                />
            </div>
        </div>
    );
}


export default ItemSuppliersTable