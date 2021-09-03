import React, { createContext } from 'react'

import styles from './AdminPanel.module.scss'

import HeaderAdmin from '../../components/HeaderAdmin'
import Sidebar from '../../components/Sidebar'
import { AdminRoutes as RoutesAdmin } from '../../routes'
import { Modal } from '../../components/Modal/Modal'
import { TModal, useModal } from '../../components/Modal/Modal.hook'

export const AdminModal = createContext<TModal | null>(null)
export const AdminModalInfo = createContext<TModal | null>(null)

const AdminPanel = () => {
  const modalConfirm = useModal('confirm')
  const modalInfo = useModal('info')

  return (
    <>
      <AdminModalInfo.Provider value={modalInfo}>
        <AdminModal.Provider value={modalConfirm}>
          <HeaderAdmin />

          <div className={styles.adminContainer}>
            <div className={styles.adminBar}>
              <Sidebar />
            </div>
            <div className={styles.adminContent}>
              <RoutesAdmin />
            </div>
          </div>
        </AdminModal.Provider>
      </AdminModalInfo.Provider>

      <Modal modal={modalConfirm}>Ви впевнені, що бажаєте зберегти зміни на сайті?</Modal>
      <Modal modal={modalInfo}>Будь ласка, заповніть даними всі необхідні поля.</Modal>
    </>
  )
}

export default AdminPanel
