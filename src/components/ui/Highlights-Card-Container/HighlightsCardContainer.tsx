import { ceilGalacticValue } from '../../../utils/helpers/ceilGalacticValue';
import { getMonthAndDay } from '../../../services/monthAndDay';
import { HighlightsCardUI } from '../';
import { type HighlightsCardContainerUIProps } from './type';

export const HighlightsCardContainerUI = ({
  aggregatedData,
  isSpecial = false,
}: HighlightsCardContainerUIProps) => {
  return (
    <>
      <HighlightsCardUI
        meaning={ceilGalacticValue(aggregatedData.total_spend_galactic)}
        description="общие расходы в галактических кредитах"
        isSpecial={isSpecial}
      />
      {aggregatedData.less_spent_civ && (
        <HighlightsCardUI
          meaning={aggregatedData.less_spent_civ}
          description="цивилизация с минимальными расходами"
          isSpecial={isSpecial}
        />
      )}
      <HighlightsCardUI
        meaning={aggregatedData.rows_affected.toLocaleString()}
        description="количество обработанных записей"
        isSpecial={isSpecial}
      />
      {aggregatedData.big_spent_at !== undefined && (
        <HighlightsCardUI
          meaning={getMonthAndDay(aggregatedData.big_spent_at)}
          description="день года с максимальными расходами"
          isSpecial={isSpecial}
        />
      )}
      {aggregatedData.less_spent_at !== undefined && (
        <HighlightsCardUI
          meaning={getMonthAndDay(aggregatedData.less_spent_at)}
          description="день года с минимальными расходами"
          isSpecial={isSpecial}
        />
      )}
      {aggregatedData.big_spent_value !== undefined && (
        <HighlightsCardUI
          meaning={ceilGalacticValue(aggregatedData.big_spent_value)}
          description="максимальная сумма расходов за день"
          isSpecial={isSpecial}
        />
      )}
      {aggregatedData.big_spent_civ && (
        <HighlightsCardUI
          meaning={aggregatedData.big_spent_civ}
          description="цивилизация с максимальными расходами"
          isSpecial={isSpecial}
        />
      )}
      {aggregatedData.average_spend_galactic !== undefined && (
        <HighlightsCardUI
          meaning={ceilGalacticValue(aggregatedData.average_spend_galactic)}
          description="средние расходы в галактических кредитах"
          isSpecial={isSpecial}
        />
      )}
    </>
  );
};
