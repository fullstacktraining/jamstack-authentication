import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ href, children, as }) => {
  const router = useRouter()
  let className = children.props.className || ''
  if (router.pathname === href || `/${router.pathname.split('/')[1]}` === href) {
    className = `${className} active`
  }

  return <Link href={href} as={as}>{React.cloneElement(children, { className })}</Link>
}