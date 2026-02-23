import { deleteProduct } from "../features/inventory/inventorySlice";
import {useSelector, useDispatch} from 'react-redux';
import {Table, Button, message, Typography, Popconfirm} from 'antd';

const {Title} = Typography

function Inventory(){
    const dispatch = useDispatch()
    const products = useSelector(state=>state.product.products)
    const columns = [
        {
            title: "Product", dataIndex: 'name', key: 'name',
        },
        {
            title: 'Price', dataIndex: 'price', key: 'price'
        },
        {
            title: 'Quantity', dataIndex: 'quantity', key: 'quantity'
        },
        {
            title: 'Brand', dataIndex: 'brand', key: 'brand'
        },
        {
            title: 'Action', key: 'action',
            render: (_, record)=>(
                <Popconfirm title="Delete Product" description="Are you sure?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
                    <Button danger>Delete</Button>
                </Popconfirm>
            )
        }
    ]
    const handleDelete=(productID)=>{
        dispatch(deleteProduct(productID))
        message.success(`Product ${productID} deleted successfully`)
    }
    return(
        <>
        <div style={{ width: "900px", margin: "40px auto" }}>
            <Title level={3}>Product Inventory</Title>
            <Table dataSource={products} columns={columns} rowKey="id" bordered pagination={{ pageSize: 5 }}/>
        </div>
        </>
    )
}
export default Inventory