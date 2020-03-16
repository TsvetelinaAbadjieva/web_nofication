'use strict'

self.addEventListener('push',(event)=>{
    const data = event.data.json();
    self.registration.showNotification(data.title,{
        body:data.body,
        icon: data.icon,
        badge:data.icon
    }).then((data)=>{
        console.log('data: ',data)
    })
})