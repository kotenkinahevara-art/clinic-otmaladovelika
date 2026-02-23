import { useRef } from 'react'
import PrimaryButton from './PrimaryButton'
import useDialogA11y from './useDialogA11y'

function PolicyModal({ isOpen, onClose, onAgree }) {
  const dialogRef = useRef(null)
  const contentRef = useRef(null)
  useDialogA11y({ isOpen, onClose, containerRef: dialogRef })

  if (!isOpen) return null

  return (
    <div
      ref={dialogRef}
      className="policy-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      aria-describedby="policy-modal-content"
    >
      <button className="policy-modal__backdrop" type="button" aria-label="Закрыть" onClick={onClose} />

      <div className="policy-modal__window">
        <button className="policy-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>

        <h2 id="policy-modal-title" className="policy-modal__title">
          Политика конфиденциальности
        </h2>

        <div id="policy-modal-content" ref={contentRef} className="policy-modal__content">
          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">1. Общие положения</h3>
            <p>
              Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006
              № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности
              персональных данных, предпринимаемые ветеринарной клиникой «Все создания от мала до велика» (далее — Оператор).
            </p>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">2. Основные понятия, используемые в Политике</h3>
            <p>
              Оператор — ветеринарная клиника «Все создания от мала до велика», самостоятельно или совместно с другими лицами
              организующая и (или) осуществляющая обработку персональных данных.
            </p>
            <p>
              Персональные данные — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу
              (субъекту персональных данных).
            </p>
            <p>
              Обработка персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с
              использованием средств автоматизации или без использования таких средств с персональными данными.
            </p>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">3. Какие персональные данные мы собираем</h3>
            <ul className="policy-modal__list">
              <li>Фамилия, имя, отчество</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Адрес проживания (при выезде на дом)</li>
              <li>Данные о питомце (вид, порода, возраст, история болезней)</li>
              <li>История обращений и оказанных услуг</li>
            </ul>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">4. Цели обработки персональных данных</h3>
            <ul className="policy-modal__list">
              <li>Запись на прием и оказание ветеринарных услуг</li>
              <li>Связь с владельцами животных для уточнения деталей</li>
              <li>Направление уведомлений о записях и изменениях</li>
              <li>Обработка запросов и обращений</li>
              <li>Ведение истории болезни животного</li>
              <li>Информирование о новых услугах и акциях</li>
            </ul>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">5. Правовые основания обработки персональных данных</h3>
            <p>
              Оператор обрабатывает персональные данные только в случае их заполнения и/или отправки Пользователем самостоятельно через
              специальные формы, расположенные на сайте. Заполняя соответствующие формы и/или отправляя свои персональные данные
              Оператору, Пользователь выражает свое согласие с данной Политикой.
            </p>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">6. Порядок сбора, хранения, передачи и других видов обработки персональных данных</h3>
            <p>
              Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых,
              организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в
              области защиты персональных данных.
            </p>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">7. Передача персональных данных</h3>
            <p>Оператор передает персональные данные третьим лицам в следующих случаях:</p>
            <ul className="policy-modal__list">
              <li>Пользователь выразил свое согласие на такие действия</li>
              <li>Передача необходима для оказания услуг клиникой</li>
              <li>Передача предусмотрена российским или иным применимым законодательством в рамках установленной процедуры</li>
            </ul>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">8. Сроки обработки персональных данных</h3>
            <p>
              Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные, если иной
              срок не предусмотрен договором или действующим законодательством.
            </p>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">9. Права субъектов персональных данных</h3>
            <p>Пользователь имеет право:</p>
            <ul className="policy-modal__list">
              <li>Получать информацию, касающуюся обработки его персональных данных</li>
              <li>
                Требовать уточнения своих персональных данных, их блокирования или уничтожения в случае, если персональные данные
                являются неполными, устаревшими, неточными
              </li>
              <li>Отозвать свое согласие на обработку персональных данных</li>
              <li>
                Обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных
              </li>
            </ul>
          </section>

          <section className="policy-modal__section">
            <h3 className="policy-modal__subtitle">10. Заключительные положения</h3>
            <p>
              Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки персональных данных,
              обратившись к Оператору по телефонам, указанным на сайте.
            </p>
            <p>
              Владелец животного, заполняя форму обратной связи, дает согласие на обработку своих персональных данных в соответствии с
              настоящей Политикой конфиденциальности.
            </p>
            <p>
              <strong>Дата последнего обновления:</strong> 15 января 2026 г.
            </p>
          </section>
        </div>

        <div className="policy-modal__footer">
          <PrimaryButton variant="cta" size="md" type="button" onClick={onAgree}>
            Согласен
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default PolicyModal
