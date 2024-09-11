/**
 * Props for the CustomButton component.
 */
export interface CustomButtonProps {
  /**
   * The text content of the button.
   */
  title: string;

  /**
   * The variant style of the button.
   */
  variant: "outline" | "filled";

  /**
   * The size of the button.
   */
  size: "small" | "medium" | "large";

  /**
   * Boolean for extraWidth of the button.
   */
  extraWidth?: boolean;

  /**
   * Boolean to disable the button.
   */
  disabled?: boolean;

  /**
   * Event handler for the button click.
   */
  onClick?: () => void;
}
