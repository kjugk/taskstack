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

const Terms: React.SFC<Props> = (props) => (
  <>
    <Helmet>
      <title>利用規約 - TaskStack</title>
    </Helmet>
    <Header style={{ marginBottom: '2rem' }} onClickBrand={() => props.history.push('/')} />
    <Container>
      <Headline as="h1">利用規約</Headline>
      <p>
        この利用規約（以下，「本規約」といいます。）は，本サービスの運営者（以下，「運営者」といいます。）がこのウェブサイト上で提供するサービス「TaskStack」（以下，「本サービス」といいます。）の利用条件を定めるものです。
        登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第1条（適用）</Headline>
        <p>本規約は，ユーザーと本サービスの利用に関わる一切の関係に適用されるものとします。</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第2条（利用登録）</Headline>
        <ol>
          <li>
            登録希望者が運営者の定める方法によって利用登録を申請し，運営者がこれを承認することによって，利用登録が完了するものとします。
          </li>
          <li>
            運営者は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
            <ol>
              <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他，運営者が利用登録を相当でないと判断した場合</li>
            </ol>
          </li>
        </ol>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第3条（ユーザーIDおよびパスワードの管理）</Headline>
        <ol>
          <li>
            ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを管理するものとします。
          </li>
          <li>
            ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与することはできません。
            運営者は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
          </li>
        </ol>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第4条（禁止事項）</Headline>
        <p>ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
        <ol>
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>運営者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
          <li>運営者のサービスの運営を妨害するおそれのある行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>他のユーザーに成りすます行為</li>
          <li>
            運営者のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
          </li>
          <li>その他，運営者が不適切と判断する行為</li>
        </ol>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第5条（本サービスの提供の停止等）</Headline>
        <ol>
          <li>
            運営者は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            <ol>
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>
                地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合
              </li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他，運営者が本サービスの提供が困難と判断した場合</li>
            </ol>
          </li>
          <li>
            運営者は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害について，理由を問わず一切の責任を負わないものとします。
          </li>
        </ol>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第6条（利用制限および登録抹消）</Headline>
        <ol>
          <li>
            運営者は，以下の場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
            <ol>
              <li>本規約のいずれかの条項に違反した場合</li>
              <li>登録事項に虚偽の事実があることが判明した場合</li>
              <li>その他，運営者が本サービスの利用を適当でないと判断した場合</li>
            </ol>
          </li>
          <li>
            運営者は，本条に基づき運営者が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
          </li>
        </ol>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第7条（免責事項）</Headline>
        <ol>
          <li>
            運営者の債務不履行責任は，運営者の故意または重過失によらない場合には免責されるものとします。
          </li>
          <li>
            運営者は，何らかの理由によって責任を負う場合にも，通常生じうる損害の範囲内においてのみ賠償の責任を負うものとします。
          </li>
        </ol>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第8条（サービス内容の変更等）</Headline>
        <p>
          運営者は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第9条（利用規約の変更）</Headline>
        <p>
          運営者は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第10条（通知または連絡）</Headline>
        <p>
          ユーザーと運営者との間の通知または連絡は，運営者の定める方法によって行うものとします。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第11条（権利義務の譲渡の禁止）</Headline>
        <p>
          ユーザーは，運営者の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <Headline as="h3">第12条（準拠法・裁判管轄）</Headline>
        <ol>
          <li>本規約の解釈にあたっては，日本法を準拠法とします。</li>
          <li>
            本サービスに関して紛争が生じた場合には，運営者の本店所在地を管轄する裁判所を専属的合意管轄とします。
          </li>
        </ol>
      </section>
    </Container>
    <Footer />
  </>
);

export default withRouter(Terms);
