import React, { FC, Dispatch, SetStateAction, useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Sidebar.module.scss'
import { menuBar } from './mock'

import { ReactComponent as ArrowSubMenu } from '../../assets/icons/arrow-sub-menu.svg'

interface IProps {
  isOpen?: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
  isHeader?: boolean
}

const Sidebar: FC<IProps> = ({ isHeader, isOpen, setIsOpen = () => {} }) => {
  const [subMenus, setSubMenus] = useState<any>({})

  const toggle = (e: any) => {
    const { dataset }: any = e.target
    if (dataset.index) {
      setSubMenus((prevState: any) => ({
        ...prevState,
        [dataset.index]: subMenus[dataset.index] === true ? false : true,
      }))
    }
  }

  return (
    <aside>
      <nav className={`${styles.barNavigation} ${isHeader && styles.hiddenNavigation} ${isOpen && styles.visible}`}>
        <ul>
          {menuBar.map(({ id, item, link, subMenu }) => {
            return (
              <li key={id} className={subMenu && subMenus[id] ? styles.active : ''}>
                {subMenu && <ArrowSubMenu />}
                <NavLink
                  to={link}
                  activeClassName={`${styles.activeLink} ${subMenu && styles.subMenu}`}
                  data-index={subMenu && id}
                  onClick={subMenu ? toggle : () => setIsOpen(false)}
                >
                  {item}
                </NavLink>
                {subMenu && (
                  <ul style={{ height: subMenu && subMenus[id] ? subMenu.length * 44 + 'px' : '0px' }}>
                    {subMenu.map(({ id, item, link }) => {
                      return (
                        <li key={id}>
                          <NavLink to={link} activeClassName={styles.activeLink} onClick={() => setIsOpen(false)}>
                            {item}
                          </NavLink>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
