import fs from "node:fs";
import path from "node:path";

const DATA_PATH = "/Users/minwokim/Documents/korean-card-research/card-data.json";

function stripTags(html = "") {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(?:p|tr|td|th|li|div|section|table)>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;|&#8203;|​/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function run() {
  const query = process.argv[2];
  if (!query) {
    console.log("Usage: node query-cards.js <search_keyword>");
    console.log("Example: node query-cards.js 세금");
    process.exit(1);
  }

  if (!fs.existsSync(DATA_PATH)) {
    console.error(`Error: card-data.json file not found at ${DATA_PATH}`);
    process.exit(1);
  }

  console.log(`Loading card database... (${query} 검색 중)`);
  const rawData = fs.readFileSync(DATA_PATH, "utf-8");
  const data = JSON.parse(rawData);
  const matchedCards = [];

  const searchRegex = new RegExp(query, "i");

  // Iterate groups and cards
  for (const group of data.groups || []) {
    for (const card of group.cards || []) {
      const cardName = card.name || "";
      const corpName = card.corp?.name || "";
      const annualFee = card.annual_fee_basic || "";
      
      // Collect all text benefits to match
      const tags = (card.top_benefit || []).flatMap(b => b.tags || []).join(" ");
      const keyBenefits = (card.key_benefit || [])
        .map(b => `${b.title || ""} ${b.comment || ""} ${stripTags(b.info || "")}`)
        .join(" ");

      const fullText = `${cardName} ${corpName} ${annualFee} ${tags} ${keyBenefits}`;

      if (searchRegex.test(fullText)) {
        matchedCards.push({
          name: cardName,
          corp: corpName,
          annualFee: annualFee.replace(/<br\s*\/?>/gi, " "),
          preMonthMoney: card.pre_month_money,
          tags: (card.top_benefit || []).flatMap(b => b.tags || []),
          benefitsSummary: (card.key_benefit || [])
            .slice(0, 3)
            .map(b => `• [${b.title}] ${b.comment}`)
            .join("\n")
        });
      }
    }
  }

  console.log(`\n검색 결과: 총 ${matchedCards.length}개 카드 매칭됨.\n`);
  
  // Show top 15 matches to avoid flooding console
  const limit = 15;
  matchedCards.slice(0, limit).forEach((card, idx) => {
    console.log(`[${idx + 1}] ${card.corp} - ${card.name}`);
    console.log(`   연회비: ${card.annualFee} | 전월실적: ${card.preMonthMoney ? card.preMonthMoney.toLocaleString() + '원' : '없음'}`);
    console.log(`   태그: ${card.tags.join(", ") || '없음'}`);
    console.log(`   주요 혜택:\n${card.benefitsSummary}`);
    console.log("-".repeat(60));
  });

  if (matchedCards.length > limit) {
    console.log(`...외 ${matchedCards.length - limit}개의 카드가 더 있습니다. 구체적인 키워드로 다시 검색해 보세요.`);
  }
}

run();
