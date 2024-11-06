import { redirect } from 'next/navigation';
import { getUserNameFromSession } from './action';
import React from 'react';

export default async function RedirectToProfile() {
  const userName = await getUserNameFromSession();

  if (userName) {
      redirect(`/user/${userName}`);
  } else {
      redirect('/404');
  }

  return (
  <div>
    <p>Please Wait While We Redirect You.</p>
  </div>
); 
}