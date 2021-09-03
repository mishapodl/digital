import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { TTeamMember } from '../../../redux/ourTeam/types'
import s from '../OurTeamPage.module.scss'
import { LangCode } from '../../../helpers'

type TProps = {
  member: TTeamMember
}

export const Member: FC<TProps> = ({ member }) => {
  const { i18n } = useTranslation()
  const { description, name, position } = member.languages[i18n.language.toUpperCase() as LangCode]
  return (
    <article className={s.member}>
      <img src={member.img} alt="team's member" />
      <div className={s.info}>
        <h1>{name}</h1>
        <h3>{position}</h3>
        {description.split('\n').map((row, i) => (
          <p key={i} className={s.row}>
            {row}
          </p>
        ))}
      </div>
    </article>
  )
}
