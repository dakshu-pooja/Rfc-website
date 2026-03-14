import React from 'react';

// Using public assets for stability (Vite handles /assets/ as public)
const imgBigSave = '/assets/deals/BIGSAVE.jpg';
const imgAddChk99 = '/assets/deals/ADDCHK99.jpg';
const imgChkZinger = '/assets/deals/CHKZINGER.jpg';
const imgVegZinger = '/assets/deals/VEGZINGER.jpg';
const imgFreeDel = '/assets/FREEDEL.jpg';

export const offers = [
    {
        id: 1,
        title: 'FREE CLASSIC ZINGER',
        desc: 'Min. Order Value 499',
        type: 'imageOverlay',
        image: imgChkZinger,
        overlayText: 'OFFER VALID ONLY ON 1st ORDER'
    },
    {
        id: 2,
        title: 'UPTO RS 100 OFF',
        desc: 'Min. Order Value 699',
        type: 'text',
        mainText: 'UPTO',
        value: '₹ 100/-',
        subText: 'OFF',
        footer: 'Applicable on 4th order onwards'
    },
    {
        id: 3,
        title: '2 PC HOT & CRISPY CHICKEN @ RS 99',
        desc: 'Min. Order Value 499',
        type: 'textSpecial',
        line1: '2 PC HOT &',
        line2: 'CRISPY CHICKEN',
        line3: '@ ₹ 99/-',
        subLine: 'ON 2ND AND 3RD ORDER'
    },
    {
        id: 4,
        title: 'FREE VEG ZINGER',
        desc: 'Min. Order Value 499',
        type: 'imageOverlay',
        image: imgVegZinger,
        overlayText: 'OFFER VALID ONLY ON 1st ORDER'
    },
    {
        id: 5,
        type: 'promoCTA'
    }
];

export const renderTicketContent = (offer) => {
    if (offer.type === 'imageOverlay') {
        return (
            <div className="relative w-full h-full overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                {offer.overlayText && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-3 text-center">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">{offer.overlayText}</span>
                    </div>
                )}
            </div>
        );
    }
    if (offer.type === 'textSpecial') {
        return (
            <div className="text-white text-center flex flex-col items-center justify-center h-full gap-0 px-2 py-4">
                <div className="text-[16px] font-[900] leading-tight uppercase tracking-tight opacity-90">{offer.line1}</div>
                <div className="text-[20px] font-[900] leading-none uppercase tracking-tight mb-1">{offer.line2}</div>
                <div className="text-[48px] font-[900] leading-none tracking-tighter mb-2">{offer.line3}</div>
                <div className="w-full flex flex-col items-center gap-1">
                    <div className="h-[1px] w-[80%] bg-white/30"></div>
                    <span className="text-[10px] font-black tracking-widest uppercase opacity-90">{offer.subLine}</span>
                </div>
            </div>
        );
    }
    if (offer.type === 'deliveryCard') {
        return (
            <div className="w-full h-full relative overflow-hidden bg-white">
                <img src={imgPlaceholder} alt="Image coming soon!" className="w-[102%] h-[102%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
        );
    }
    if (offer.type === 'text') {
        return (
            <div className="text-white text-center leading-tight flex flex-col items-center justify-center h-full relative px-2 py-4">
                {offer.mainText && (
                    <div className="flex items-center gap-2 mb-1 w-full justify-center">
                        <span className="h-[1px] flex-1 bg-white/30"></span>
                        <span className="text-[12px] font-black tracking-widest uppercase opacity-90">{offer.mainText}</span>
                        <span className="h-[1px] flex-1 bg-white/30"></span>
                    </div>
                )}
                <div className="text-[56px] font-[900] tracking-tighter leading-none mb-1">{offer.value}</div>
                {offer.subText && (
                    <div className="flex items-center gap-2 mt-1 w-full justify-center">
                        <span className="h-[1px] flex-1 bg-white/30"></span>
                        <span className="text-[12px] font-black tracking-widest uppercase opacity-90">{offer.subText}</span>
                        <span className="h-[1px] flex-1 bg-white/30"></span>
                    </div>
                )}
                {offer.footer && (
                    <div className="absolute bottom-3 left-0 right-0 text-center">
                        <span className="text-[10px] font-bold text-white/90 uppercase tracking-tight">{offer.footer}</span>
                    </div>
                )}
            </div>
        );
    }
};
