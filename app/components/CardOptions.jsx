"use client"

// modules
import Tippy from '@tippyjs/react'
import { useState } from 'react'

// icons
import { Bookmark, EyeSlash, SpinnerGap } from "@phosphor-icons/react"

const CardOptions = ({ post, setPost }) => {
    const [hideLoading, setHideLoading] = useState(false)
    const [bkLoading, setBkLoading] = useState(false)

    const updateHidePost = async () => {
        setHideLoading(true)

        const req = await fetch('/api/post/updatePost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: post._id,
                hide: !post.hide
            })
        })
    
        const response = await req.json()
    
        if (response.success) {
            setPost({...post, hide: !post.hide})
            setHideLoading(false)
        }
    }

    const updateBookmark = async () => {
        setBkLoading(true)

        const req = await fetch('/api/post/updatePost', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                 id: post._id,
                 bookmarked: !post.bookmarked
             })
         })
     
         const response = await req.json()
     
         if (response.success) {
            setPost({...post, bookmarked: !post.bookmarked})
            setBkLoading(false)
         }
    }

    return (
        <div className='opts'>
            <div
                id='options'
                onClick={(e) => updateBookmark()}
            >
                <Tippy content={post.bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}>
                    {bkLoading ?
                        <SpinnerGap size={20} className='loads' />
                    :
                        <Bookmark
                            size={20}
                            className={(post.bookmarked ? 'active' : '')+' pointer-events-none'}
                        />
                    }
                </Tippy>
            </div>

            <div
                id='options'
                onClick={() => updateHidePost()}
            >
                <Tippy content={post.hide ? 'Unhide' : 'Hide'}>
                    {hideLoading ?
                        <SpinnerGap size={20} className='loads' />
                    :
                        <EyeSlash
                            size={20}
                            className={(post.hide ? 'active' : '')+' pointer-events-none'}
                        />  
                    }
                </Tippy>
            </div>
        </div>
    )
}
 
export default CardOptions