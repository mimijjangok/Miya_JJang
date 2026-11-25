import React, { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { useSearchParams } from "react-router";
import { ArrowLeft } from "lucide-react";

// 의뢰하기 — 모두바 사이트 의뢰 페이지와 같은 구성 (접수 → /api/contact → 메일 알림)
const TYPES = ["캐릭터 제작", "로고 · 브랜딩", "홈페이지", "앱", "굿즈 제작", "기타"];
const SCOPES = ["디자인만", "퍼블만", "개발만", "기획만"];
const BUDGETS = ["미정", "100만원 이하", "100 ~ 300만원", "300 ~ 500만원", "500 ~ 1,000만원", "1,000만원 이상"];
const mailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL = "mimijjangok@gmail.com";

const Opt = ({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2.5 text-sm font-semibold border transition-colors ${on ? "bg-black text-white border-black" : "border-zinc-300 text-gray-600 hover:border-black hover:text-black"}`}
  >
    {children}
  </button>
);

const Field = ({ label, req, opt, err, msg, children }: { label: string; req?: boolean; opt?: boolean; err?: boolean; msg?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-bold mb-2">
      {label}
      {req && <span className="text-[#E5484D] ml-0.5">*</span>}
      {opt && <span className="ml-2 text-xs font-medium text-gray-400">선택</span>}
    </label>
    {children}
    {err && msg && <p className="mt-1.5 text-xs text-[#E5484D]">{msg}</p>}
  </div>
);

const inputCls = (err?: boolean) =>
  `w-full border ${err ? "border-[#E5484D]" : "border-zinc-300"} px-4 py-3 text-[15px] outline-none focus:border-black transition-colors bg-white`;

export const Inquiry = () => {
  const [params] = useSearchParams();
  const ref = params.get("ref") || "";
  const initType = params.get("type") === "character" ? ["캐릭터 제작"] : [];

  const [types, setTypes] = useState<string[]>(initType);
  const [scope, setScope] = useState<string[]>([]);
  const [f, setF] = useState({ name: "", phone: "", email: "", company: "", budget: "미정", due: "", body: ref ? `${ref} 같은 캐릭터를 만들고 싶어요.\n` : "", hp: "" });
  const [agree, setAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [tried, setTried] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const errs = useMemo(() => ({
    type: !types.length,
    name: !f.name.trim(),
    phone: f.phone.replace(/\D/g, "").length < 9,
    email: !mailRe.test(f.email.trim()),
    body: f.body.trim().length < 10,
    agree: !agree,
  }), [types, f, agree]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const phoneFmt = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length > 7) return d.slice(0, 3) + "-" + d.slice(3, d.length - 4) + "-" + d.slice(-4);
    if (d.length > 3) return d.slice(0, 3) + "-" + d.slice(3);
    return d;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (Object.values(errs).some(Boolean)) return;
    setState("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, name: f.name.trim(), email: f.email.trim(), types, scope, ref }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setState("done");
      window.scrollTo(0, 0);
    } catch {
      setState("error");
    }
  };

  if (state === "done")
    return (
      <div className="pt-40 pb-32 px-6 md:px-12 max-w-3xl mx-auto text-black">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-4">Inquiry</div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">의뢰가 접수됐어요</h1>
        <p className="text-gray-600 mb-10 break-keep">남겨 주신 연락처로 영업일 기준 1~2일 안에 답변드릴게요.</p>
        <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 border-2 border-black px-8 py-4 font-bold hover:bg-black hover:text-white transition-colors">
          <ArrowLeft size={16} /> 돌아가기
        </button>
      </div>
    );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pt-28 pb-24 px-6 md:px-12 max-w-3xl mx-auto text-black">
      <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#05D920] transition-colors mb-6">
        <ArrowLeft size={12} /> Back
      </button>
      <div className="border-b-2 border-black pb-8 mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#05D920] mb-4">Inquiry</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">의뢰하기</h1>
        <p className="mt-5 text-gray-500 break-keep">
          {ref ? <><b className="text-black">{ref}</b>을(를) 보고 문의 주셨네요. </> : null}
          만들고 싶은 것을 알려 주시면 확인 후 연락드릴게요.
        </p>
      </div>

      <form onSubmit={submit} noValidate className="space-y-8">
        <Field label="의뢰 유형" req err={tried && errs.type} msg="의뢰 유형을 하나 이상 골라 주세요.">
          <div className="flex flex-wrap gap-2">{TYPES.map((t) => <Opt key={t} on={types.includes(t)} onClick={() => toggle(types, setTypes, t)}>{t}</Opt>)}</div>
        </Field>
        <Field label="의뢰 범위" opt>
          <div className="flex flex-wrap gap-2">{SCOPES.map((t) => <Opt key={t} on={scope.includes(t)} onClick={() => toggle(scope, setScope, t)}>{t}</Opt>)}</div>
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="이름" req err={tried && errs.name} msg="이름을 입력해 주세요.">
            <input className={inputCls(tried && errs.name)} placeholder="이름을 입력해 주세요" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          </Field>
          <Field label="연락처" req err={tried && errs.phone} msg="연락처를 정확히 입력해 주세요.">
            <input className={inputCls(tried && errs.phone)} type="tel" placeholder="010-0000-0000" value={f.phone} onChange={(e) => setF({ ...f, phone: phoneFmt(e.target.value) })} />
          </Field>
          <Field label="이메일" req err={tried && errs.email} msg="이메일 주소를 확인해 주세요.">
            <input className={inputCls(tried && errs.email)} type="email" placeholder="example@email.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          </Field>
          <Field label="회사 · 브랜드명" opt>
            <input className={inputCls()} placeholder="회사 또는 브랜드명" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} />
          </Field>
          <Field label="예산" opt>
            <select className={inputCls()} value={f.budget} onChange={(e) => setF({ ...f, budget: e.target.value })}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
          </Field>
          <Field label="희망 일정" opt>
            <input className={inputCls()} placeholder="예) 2주 안에, 12월 말까지" value={f.due} onChange={(e) => setF({ ...f, due: e.target.value })} />
          </Field>
        </div>
        <Field label="의뢰 내용" req err={tried && errs.body} msg="의뢰 내용을 10자 이상 입력해 주세요.">
          <textarea className={`${inputCls(tried && errs.body)} min-h-[180px]`} placeholder="만들고 싶은 캐릭터·로고·홈페이지의 콘셉트, 참고 사례 등을 자유롭게 적어주세요." value={f.body} onChange={(e) => setF({ ...f, body: e.target.value })} />
        </Field>
        {/* 스팸 방지 (사람에게는 안 보임) */}
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" value={f.hp} onChange={(e) => setF({ ...f, hp: e.target.value })} />

        <div className={`border ${tried && errs.agree ? "border-[#E5484D]" : "border-zinc-200"} p-5`}>
          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-3 text-sm font-semibold cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-black" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              개인정보 수집·이용에 동의합니다. <b className="text-[#E5484D] font-semibold">(필수)</b>
            </label>
            <button type="button" onClick={() => setShowTerms((v) => !v)} className="text-xs text-gray-500 underline shrink-0">{showTerms ? "접기" : "내용 보기"}</button>
          </div>
          {showTerms && (
            <div className="mt-4 text-xs text-gray-500 leading-relaxed break-keep">
              <b className="text-gray-700">개인정보 수집·이용 동의</b><br />
              ① 수집 항목: 이름, 연락처, 이메일, 의뢰 유형·범위, 의뢰 내용 (선택: 회사·브랜드명, 예산, 희망 일정)<br />
              ② 수집·이용 목적: 디자인 의뢰 상담, 견적 안내 및 회신<br />
              ③ 보유·이용 기간: 상담 완료 후 지체 없이 파기합니다. 다만 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.<br />
              ④ 처리 위탁: 접수 알림 메일 발송을 위해 이메일 발송 서비스(Resend, 미국)를 이용합니다.<br />
              ⑤ 동의 거부 권리: 동의를 거부할 수 있습니다. 다만 거부하시면 의뢰 접수가 제한됩니다.<br />
              ⑥ 운영자: MI3___LEE (김미례)
            </div>
          )}
          {tried && errs.agree && <p className="mt-2 text-xs text-[#E5484D]">개인정보 수집·이용에 동의해 주세요.</p>}
        </div>

        {state === "error" && (
          <p className="text-sm text-[#E5484D] break-keep">
            접수 중 문제가 생겼어요. 잠시 후 다시 시도하시거나 <a className="underline font-semibold" href={`mailto:${EMAIL}`}>{EMAIL}</a>로 보내 주세요.
          </p>
        )}
        <button type="submit" disabled={state === "sending"} className="w-full bg-black text-white py-5 text-base font-bold hover:bg-[#05D920] hover:text-black transition-colors disabled:opacity-60">
          {state === "sending" ? "접수 중..." : "의뢰 접수하기"}
        </button>
      </form>
    </motion.div>
  );
};
