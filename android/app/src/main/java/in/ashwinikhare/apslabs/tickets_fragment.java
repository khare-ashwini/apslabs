package in.ashwinikhare.apslabs;

import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.EditText;

/**
 * Created by ash on 6/20/15.
 */

public class tickets_fragment extends DialogFragment {

    private EditText mEditText;

    public tickets_fragment() {
        // Empty constructor required for DialogFragment
    }

    public static tickets_fragment newInstance(String title) {
        tickets_fragment frag = new tickets_fragment();
        Bundle args = new Bundle();
        args.putString("title", title);
        frag.setArguments(args);
        return frag;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.tickets_dialog, container);
        mEditText = (EditText) view.findViewById(R.id.txtName);
        String title = getArguments().getString("title", "Enter Name");
        getDialog().setTitle(title);
        // Show soft keyboard automatically
        mEditText.requestFocus();

        getDialog().getWindow().setSoftInputMode(
                WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);
        return view;
    }

    public void bookSeat(View view){
        //Get Form parameters
        EditText nameEditText = (EditText) view.findViewById(R.id.txtName);
        EditText emailEditText = (EditText) view.findViewById(R.id.txtEmail);
        EditText qtyEditText = (EditText) view.findViewById(R.id.txtQty);

        String name = nameEditText.getText().toString();
        String email = emailEditText.getText().toString();
        String qty = qtyEditText.getText().toString();
    }
}
