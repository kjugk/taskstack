import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Headline from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface Props {
  match: any;
  location: any;
  history: any;
}

const Privacy: React.SFC<Props> = (props) => (
  <>
    <Helmet>
      <title>プライバシーポリシー - TaskStack</title>
    </Helmet>
    <Header style={{ marginBottom: '2rem' }} onClickBrand={() => props.history.push('/')} />
    <Container>
      <Headline as="h1">プライバシーポリシー</Headline>
      <p>
        本サービスの運営者（以下，「運営者」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）におけるプライバシー情報の取扱いについて，
        以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第1条（個人情報について）</Headline>
        <p>
          本サービスではログインに必要な「Googleのログイン情報（authトークン）」などの情報を保存しています。これらはサイト利用の範囲内で使われます。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第2条（個人情報の取得・収集）</Headline>
        <p>
          運営者は、業務の遂行にあたり、個人情報を取得することがあり、取得を行う際は、適正かつ公正な手段により行い、利用目的をあらかじめ公表するか、取得後速やかにご本人に通知または公表いたします。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第3条（個人情報の利用目的）</Headline>
        <p>運営者は、取得した個人情報を下記の目的の範囲内で適切に利用いたします。</p>
        <ol>
          <li>サービス全般の提供のため</li>
          <li>サービスへのログインに伴う本人確認のため</li>
          <li>お客様のサービス利用状況に関する調査、統計、分析のため</li>
          <li>システムの維持、不具合対応のため</li>
          <li>法令等により提供が必要な場合に、適切な第三者への情報開示責任を遂行するため</li>
          <li>上記の利用目的に付随する目的のため</li>
        </ol>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第4条（個人情報の第三者提供）</Headline>
        <p>
          運営者は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
        </p>
        <ol>
          <li>法令に基づく場合</li>
          <li>
            人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき
          </li>
          <li>
            国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
          </li>
        </ol>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第5条（個人情報の開示・訂正・利用停止）</Headline>
        <p>
          運営者は個人情報の管理責任者及び、個人情報の問い合わせ・開示・訂正・利用停止の請求先、個人情報の取り扱いに関する苦情の申出先を下記の通り定め、
          個人情報の開示・訂正・利用停止の請求はお客様本人またはその代理人が書面（電子メールを含む）にて行うものとします。
        </p>
        <p>
          お客様またはその代理人の方からの個人情報の開示・訂正・利用停止の請求があった場合には、運営者は、当該請求がお客様ご本人の請求であることをしかるべき方法で確認させて頂いた上で、
          法令の定める合理的な範囲で速やかに対応いたします。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第6条（プライバシーポリシーの改定）</Headline>
        <ol>
          <li>
            本ポリシーの内容は，ユーザーに通知することなく，改定することができるものとします。
          </li>
          <li>
            運営者が別途定める場合を除いて，改定後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
          </li>
        </ol>
      </section>
    </Container>
    <Footer />
  </>
);

export default withRouter(Privacy);
