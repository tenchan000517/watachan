'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="mt-[20vw] md:mt-[10vw] px-[5%] md:px-[10%] py-[8vw] bg-[#FFFDFD]">
      <h1 className="text-[clamp(1.5rem,1.364rem+0.57vw,1.8rem)] font-bold mb-8 text-center">個人情報保護方針</h1>
      
      <div className="text-[clamp(0.875rem,0.795rem+0.34vw,1.125rem)] leading-relaxed space-y-6">
        <p>
          ワタナべ薬局（以下、「当社」）は、お客様の個人情報保護の重要性について認識し、個人情報の保護に関する法律（個人情報保護法）に基づき、以下のとおり個人情報保護方針を定め、これを実行し維持することを誓約いたします。
        </p>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">1. 個人情報の取得</h2>
          <p>
            当社は、適法かつ公正な手段によって個人情報を取得いたします。取得する個人情報の項目は以下を含みますが、これらに限定されません：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>氏名、生年月日、性別</li>
            <li>住所、電話番号、メールアドレス</li>
            <li>健康保険証の記号番号</li>
            <li>病歴、服用中の薬剤情報</li>
            <li>アレルギー情報</li>
            <li>その他医療サービス提供に必要な情報</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">2. 個人情報の利用目的</h2>
          <p>
            当社は、取得した個人情報を以下の目的で利用いたします：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>調剤業務の実施及び医薬品の提供</li>
            <li>お客様の健康管理及び医療サービスの提供</li>
            <li>医療費請求事務</li>
            <li>お客様からのお問い合わせ、相談への対応</li>
            <li>医薬品の安全管理業務</li>
            <li>当社からの重要なお知らせの送付</li>
            <li>サービスの品質向上のための調査、分析</li>
            <li>薬剤師実務実習の指導</li>
            <li>法令等の規定に基づく利用</li>
          </ul>
          <p className="mt-2">
            上記の利用目的の変更は、変更前の利用目的と関連性を有すると合理的に認められる範囲でのみ行い、変更する場合には、その内容をお客様に通知し、または当社ウェブサイト上に公表いたします。
          </p>
        </section>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">3. 個人情報の管理</h2>
          <p>
            当社は、個人情報の正確性及び安全性確保のために、以下の措置を講じます：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>個人情報への不正アクセス、紛失、破壊、改ざん、漏洩などのリスクに対する、合理的な安全対策の実施</li>
            <li>個人情報を取り扱う従業者の限定と、個人情報保護に関する教育・訓練の実施</li>
            <li>個人情報を記録している媒体（紙、電子データ）の適切な管理</li>
            <li>個人情報保護に関する規程の整備と、それらの継続的な見直しと改善</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">4. 個人情報の第三者提供</h2>
          <p>
            当社は、以下のいずれかに該当する場合を除き、お客様の同意を得ることなく、個人情報を第三者に提供することはありません：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>法令に基づく場合</li>
            <li>人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を得ることが困難であるとき</li>
            <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、お客様の同意を得ることが困難であるとき</li>
            <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、お客様の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">5. 個人情報の開示・訂正・利用停止等</h2>
          <p>
            当社は、お客様ご本人からの個人情報の開示、訂正、追加、削除、利用停止、第三者提供の停止等のご要望に対して、以下のとおり対応いたします：
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>ご本人確認：運転免許証、健康保険証、パスポートなどの公的証明書の提示をお願いいたします。</li>
            <li>手数料：開示請求については、1件あたり1,000円の手数料をいただきます。</li>
            <li>対応期間：ご請求を受けてから2週間以内に対応いたします。</li>
            <li>対応できない場合：法令に定める理由により、ご要望に応じられない場合があります。その場合は、その理由をご説明いたします。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">6. クッキー（Cookie）の使用について</h2>
          <p>
            当社ウェブサイトでは、お客様の利便性向上のため、クッキーを使用することがあります。クッキーの使用により個人を特定できる情報の収集は行っておりませんが、お客様はブラウザの設定でクッキーの受け取りを拒否することができます。
          </p>
        </section>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">7. 未成年者の個人情報</h2>
          <p>
            当社は、16歳未満の方の個人情報取得にあたっては、保護者の同意を得るよう努めます。保護者の方は、お子様の個人情報の開示、訂正、削除等を求めることができます。
          </p>
        </section>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">8. 個人情報保護に関する法令、規範の遵守</h2>
          <p>
            当社は、個人情報の保護に関する法令、国が定める指針、その他の規範を遵守します。また、本方針の内容を適宜見直し、改善に努めます。
          </p>
        </section>

        <section>
          <h2 className="text-[clamp(1.25rem,1.136rem+0.48vw,1.5rem)] font-semibold mb-4">9. 本方針の変更</h2>
          <p>
            当社は、必要に応じて、本方針を変更することがあります。変更後の本方針については、当社ウェブサイトでお知らせするとともに、変更内容が重要な場合には、お客様に個別にご連絡いたします。
          </p>
        </section>

        <p className="mt-8">
          本方針に関するお問い合わせは、下記の連絡先までお願いいたします。
        </p>

        <address className="not-italic mt-4">
          ワタナべ薬局<br />
          管理者：渡部 遼平<br />
          〒776-0010 徳島県吉野川市鴨島町鴨島216-1<br />
          電話番号：0883-24-0770<br />
          {/* メールアドレス：privacy@watanabe-pharmacy.com */}
        </address>

      </div>

      <div className="text-center mt-12">
        <Link href="/" className="inline-block bg-[#22E200] text-white px-6 py-2 rounded-[7px] text-[clamp(0.875rem,0.795rem+0.34vw,1.125rem)]">
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}