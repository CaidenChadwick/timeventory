import { redirect } from 'next/navigation';
import { getUserNameFromSession } from './action';
import React from 'react';

export default async function RedirectToProfile() {
  const userName = await getUserNameFromSession();

  if (userName) {
      // Redirect to the user's profile page if logged in
      redirect(`/user/${userName}`);
  } else {
      // Redirect to a 404 page if not logged in
      redirect('/404');
  }

  return null; // No content needs to be rendered due to redirection
}