import React from 'react'
import { Link } from 'react-router-dom'
import { TreeItem,TreeView } from '@mui/lab'
import { Expand } from '@mui/icons-material'
import { PostAdd } from '@mui/icons-material'
import { Add } from '@mui/icons-material'
import { ImportExport } from '@mui/icons-material'
import { Dashboard } from '@mui/icons-material'
import { People } from '@mui/icons-material'
import { RateReview } from '@mui/icons-material'
import { ListAlt } from '@mui/icons-material'
import "./sidebar.css"
const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link to="/admin/dashboard">
      <h1 className='f'>Kumars</h1>
    </Link>
    <Link to="/admin/dashboard">
      <p>
        <Dashboard /> Dashboard
      </p>
    </Link>

      {/* <TreeView
        defaultCollapseIcon={<Expand/>}
        defaultExpandIcon={<ImportExport />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
          </Link>

          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<Add />} />
          </Link>
        </TreeItem>
      </TreeView> */}
       <Link to="/admin/products">
      <p>
        <ListAlt/>
        Products
      </p>
    </Link>
    <Link to="/admin/product">
      <p>
        <Add /> Add Product 
      </p>
    </Link>
    <Link to="/admin/reviews">
      <p>
        <RateReview />
        Reviews
      </p>
    </Link>

    <Link to="/admin/orders">
      <p>
        <ListAlt/>
        Orders
      </p>
    </Link>
    <Link to="/admin/users">
      <p>
        <People /> Users
      </p>
    </Link>
   
  </div>
  )
}

export default Sidebar