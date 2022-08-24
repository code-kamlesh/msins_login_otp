import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Language from './language/Language'

export default function Header() {
  const { t } = useTranslation()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky' sx={{ background: '#62c4e7' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {/* News */}
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={t('logo')}
                style={{
                  maxHeight: '45px',
                  maxWidth: '100%',
                  verticalAlign: 'sub',
                  mr: 2,
                }}
                alt='logo'
              />
            </Link>
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Language />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
