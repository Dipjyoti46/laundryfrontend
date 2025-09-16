import React from 'react'
import PriceNav from '../pricelist/PriceNav'
import PriceList from '../pricelist/PriceList'
import { Routes, Route, useLocation } from 'react-router-dom'

const Prices = () => {
  const priceList = [
    {
      "item": "Shirt",
      "wash_and_fold": 30,
      "wash_and_iron": 50,
      "dry_clean": 70
    },
    {
      "item": "Trousers",
      "wash_and_fold": 35,
      "wash_and_iron": 55,
      "dry_clean": 75
    },
    {
      "item": "Saree",
      "wash_and_fold": 60,
      "wash_and_iron": 80,
      "dry_clean": 120
    },
    {
      "item": "Bedsheet (Single)",
      "wash_and_fold": 50,
      "wash_and_iron": 70,
      "dry_clean": 100
    },
    {
      "item": "Bedsheet (Double)",
      "wash_and_fold": 70,
      "wash_and_iron": 90,
      "dry_clean": 130
    },
    {
      "item": "Towel",
      "wash_and_fold": 20,
      "wash_and_iron": 30,
      "dry_clean": 50
    },
    {
      "item": "Jacket",
      "wash_and_fold": 80,
      "wash_and_iron": 100,
      "dry_clean": 150
    },
    {
      "item": "Blanket",
      "wash_and_fold": 100,
      "wash_and_iron": 130,
      "dry_clean": 180
    },
    {
      "item": "Curtains (per panel)",
      "wash_and_fold": 60,
      "wash_and_iron": 80,
      "dry_clean": 110
    }
  ]

  const getPriceType = (path) => {
    switch (path) {
      case '/prices/washing':
        return 'wash_and_fold'
      case '/prices/ironing':
        return 'wash_and_iron'
      case '/prices/drycleaning':
        return 'dry_clean'
      default:
        return 'wash_and_fold'
    }
  }

  return (
    <div className=' min-h-screen w-full'>
      <div className='bg-[#A96030] min-h-screen w-full'>
        <PriceNav />
        <Routes>
          <Route path="washing" element={<PriceList priceList={priceList} priceType="wash_and_fold" title="Washing Price List" />} />
          <Route path="drycleaning" element={<PriceList priceList={priceList} priceType="dry_clean" title="Dry Cleaning Price List" />} />
          <Route path="ironing" element={<PriceList priceList={priceList} priceType="wash_and_iron" title="Ironing Price List" />} />
          <Route index element={<PriceList priceList={priceList} priceType="wash_and_fold" title="Washing Price List" />} />
        </Routes>
      </div>
    </div>
  )
}

export default Prices
