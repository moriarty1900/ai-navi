"use client";
import Image from "next/image";
import rawData from "../../data.json";
import { useState } from "react";
import Link from "next/link";
import {Section,Card} from '../types'


export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Section[] | null>(rawData);

  const handleSearch = () => {
    const filterData: Array<Section> = [];
    for (const section of rawData) {
      if (
        !section.cards.some((card: Card) =>
          card.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      ) {
        continue;
      }
      const filteredCards = section.cards.filter((card: Card) =>
        card.name.toLowerCase().includes(search.toLocaleLowerCase())
      );
      filterData.push({
        ...section,
        cards: filteredCards,
      });
    }
    setData(filterData);
  };

  return (
    <div className="min-h-screen w-full">
      {/* 搜索栏 */}
      <div className=" w-full h-64 flex flex-col justify-center items-center">
        <p>搜索本站内容</p>
        <div className=" flex flex-row justify-center items-center w-3/4 mt-2 gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" w-1/2 h-10 rounded-md border-2 border-gray-300 p-2"
          />
          <button
            onClick={handleSearch}
            className=" h-10 rounded-md bg-blue-500 text-white px-4"
          >
            搜索
          </button>
        </div>
      </div>
      {/* 热门工具 */}
      <div>
        {data?.map((section: Section, index: number) => {
          return (
            <div
              className=" w-full flex flex-col"
              id={section.title}
              key={section.title}
            >
              <p className=" text-2xl font-bold mt-4 ml-4">{section.title}</p>
              <div className="flex flex-row w-full flex-wrap">
                {/* 一张卡片 */}
                {section.cards.map((card: Card) => {
                  return (
                    <Link
                      href={`/card/${card.id}`}
                      key={card.id}
                      className=" h-32 w-full sm:w-1/2 lg:w-1/5 p-4"
                    >
                      <div className=" h-full w-full bg-white rounded-lg flex flex-row flex-wrap items-center">
                        <div className=" w-2/5 flex items-center justify-center">
                          <Image
                            src={`/img/${card.img}`}
                            alt={card.name}
                            width={60}
                            height={60}
                            className=" rounded-lg"
                          />
                        </div>
                        <div className=" flex flex-col w-3/5 p-2">
                          <p className=" text-xs lg:text-lg font-bold line-clamp-1">
                            {card.name}
                          </p>
                          <p className=" text-xs lg:text-sm line-clamp-2 text-gray-500">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* footer */}
      <div className=" h-screen w-full flex flex-col items-center justify-end">
        <p className=" text-slate-500 mb-4">
          Copyright 2025 本站所有内容均为AI生成
        </p>
      </div>
    </div>
  );
}
