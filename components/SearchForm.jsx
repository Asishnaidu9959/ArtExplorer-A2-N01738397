/* ITE5425 — Mastery Assignment 2: My Art Explorer
 * Academic-integrity declaration: I affirm that this submission complies with
 * Humber Academic Policy, and I have disclosed generative-AI assistance in ai-use.md.
 * I have not copied or distributed another student's implementation.
 * Name: Asish Anisetti  Student ID: N01738397  Date: 2026-11-18
 */
'use client';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
export default function SearchForm(){const router=useRouter();const {register,handleSubmit,formState:{errors}}=useForm();function submit(data){const query=new URLSearchParams({q:data.keyword});if(data.titleOnly)query.set('title','true');router.push(`/artwork?${query.toString()}`)}return <form onSubmit={handleSubmit(submit)}><label>Keyword<br/><input className="field" {...register('keyword',{required:'Keyword required',minLength:{value:3,message:'Enter at least 3 characters'}})}/></label>{errors.keyword&&<p className="error">{errors.keyword.message}</p>}<p><label><input type="checkbox" {...register('titleOnly')}/> Search titles only</label></p><button className="button">Find artworks</button></form>}
