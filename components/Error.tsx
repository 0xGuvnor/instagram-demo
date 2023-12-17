interface Props {
  res:
    | {
        errors: { [key: string]: string[] | undefined } | undefined;
        message: string;
      }
    | {
        errors?: undefined;
        message: string;
      };
}

function Error({ res: { errors, message } }: Props) {
  return (
    <div>
      {errors &&
        Object.entries(errors).map(([key, value]) => (
          <div key={key} id={`${key}-error`} aria-live="polite">
            <span className="font-bold capitalize">{key}: </span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}

      <div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
export default Error;
