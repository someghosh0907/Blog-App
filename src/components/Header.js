import React from 'react'
import { Box, AppBar, Button, Typography, Toolbar, Tabs, Tab } from "@mui/material"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../store'
import './blog.css'
import boy01 from './anime-boy.jpg';

const Header = () => {
  const dispatch = useDispatch()
  const navi = useNavigate()
  //GLOBAL STATE(REDUX)
  const isLogin = useSelector((state) => state.isLogin)
  console.log(isLogin)
  //NORMAL STATE
  /*const [value,setValue]=useState()*/
  const handleLogout = () => {
    try {
      dispatch(authActions.logout())
      alert('Logout Successful')
      navi('/login')
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='header'>
      <div className='img01'>
        <img src='' alt='img' />
      <AppBar postion="sticky" >
        <Toolbar >
          <Typography variant="h4" padding={"20px"} Color={"red"}>My BLogzzz App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" >
              <Tabs textColor='inherit' /*value={value} onChange={(e,val)=>setValue(val)}*/>
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto" >

            <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/login">Login</Button>
            {!isLogin && (
              <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/register">Register</Button>)}
            {isLogin && (
              <Button onClick={() => handleLogout()} sx={{ margin: 1, color: "white" }} >Logout</Button>)}
          </Box>


        </Toolbar>
      </AppBar>
      </div>
    </div>
  )
}

export default Header