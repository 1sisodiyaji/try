import Card from "../common/Card";
import { WORK_LIST } from "@/constants/WorkList";

export default function WorkList() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-16">
        {WORK_LIST.map((card, index) => (
          <Card
            key={index}
            src={card.src}
            alt={card.alt}
            title={card.title}
            buttons={card.buttons}
          />
        ))}
      </div>
    </section>
  );
}
